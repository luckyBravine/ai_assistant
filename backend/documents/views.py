from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import DocumentOriginal, DocumentImproved, DocumentCombined
from .serializer import DocumentOriginalSerializer, DocumentImprovedSerializer, DocumentCombinedSerializer
from .nltk_analysis import GrammarSuggestions, StyleSuggestions, ClaritySuggestions
from rest_framework.permissions import IsAuthenticated  # Import IsAuthenticated

import mimetypes
import pythoncom
import win32com.client
from PyPDF2 import PdfReader
from io import BytesIO
from docx import Document as DocxDocument
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.core.files.base import ContentFile


from django.contrib.auth.models import User
from .permissions import IsOwner 

class DocumentOriginalView(APIView):
    
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        # Attach the user to the document during the upload
        user = request.user  # This should be a valid user object due to IsAuthenticated permission
        
        # Check if the user is authenticated
        if user.is_anonymous:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)
        
        
        serializer = DocumentOriginalSerializer(data=request.data)
        
        if serializer.is_valid():
            document = serializer.save()

            # Guess the file type (e.g., PDF, text, etc.)
            mime_type, _ = mimetypes.guess_type(document.document.name)

            # Read the file data
            document_data = document.document.read()

            # Extract content based on file type
            document_content = self.extract_content(mime_type, document_data)
            
            # Prepare the response data
            response_data = serializer.data
            response_data['content'] = document_content
            
            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        doc_id = kwargs.get('doc_id')
        document = get_object_or_404(DocumentOriginal, id=doc_id)

        mime_type, _ = mimetypes.guess_type(document.document.name)
        document_data = document.document.read()

        document_content = self.extract_content(mime_type, document_data)

        serializer = DocumentOriginalSerializer(document)
        response_data = serializer.data
        response_data['content'] = document_content
        
        return Response(response_data)
    
    def extract_content(self, mime_type, document_data):
        """Extract content based on file type."""
        if mime_type == "application/pdf":
            return self.extract_pdf_content(document_data)
        elif mime_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return self.extract_docx_content(document_data)
        elif mime_type == "application/msword":
            return self.extract_doc_content(document_data)
        elif mime_type.startswith("text/"):
            return self.extract_text_content(document_data)
        elif mime_type.startswith("image/"):
            return self.extract_image_content(document_data)
        else:
            return "Unknown or unsupported file type."

    def extract_pdf_content(self, document_data):
        """Extract text from PDF file."""
        try:
            pdf_reader = PdfReader(BytesIO(document_data))
            pdf_text = ""
            for page in pdf_reader.pages:
                pdf_text += page.extract_text()
            return pdf_text if pdf_text else "No text found in the PDF."
        except Exception as e:
            return f"Error extracting text from PDF: {str(e)}"

    def extract_docx_content(self, document_data):
        """Extract text from DOCX file."""
        try:
            doc = DocxDocument(BytesIO(document_data))
            doc_text = "\n".join([para.text for para in doc.paragraphs])
            return doc_text if doc_text else "No text found in the DOCX document."
        except Exception as e:
            return f"Error extracting text from DOCX: {str(e)}"
        
    def extract_doc_content(self, document_data):
        """Extract text from DOC file using pywin32."""
        try:
            # Initialize COM library
            pythoncom.CoInitialize()
            word = win32com.client.Dispatch("Word.Application")
            doc = win32com.client.Dispatch("Word.Document")
            doc = word.Documents.Open(BytesIO(document_data))
            doc_text = doc.Content.Text
            doc.Close(False)
            word.Quit()
            return doc_text if doc_text else "No text found in the DOC file."
        except Exception as e:
            return f"Error extracting text from DOC: {str(e)}"

    def extract_text_content(self, document_data):
        """Extract text from plain text file."""
        try:
            return document_data.decode('utf-8')
        except UnicodeDecodeError:
            return "Binary file - cannot decode to text."
        
        

class DocumentImprovedView(APIView):
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated, IsOwner]  # Ensure only authenticated users can access this view

    def post(self, request, suggestion_type, *args, **kwargs):
        
        # Ensure user is authenticated
        if not request.user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_403_FORBIDDEN)

        # Get the content and suggestion type from the request
        content = request.data.get('content')
        suggestion_type = request.data.get('suggestionType')

        if not content:
            return Response({'error': 'No content provided'}, status=status.HTTP_400_BAD_REQUEST)

        if not suggestion_type:
            return Response({'error': 'No suggestion type provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Select the analyzer based on suggestion_type
        if suggestion_type == 'grammar':
            analyzer = GrammarSuggestions()
        elif suggestion_type == 'style':
            analyzer = StyleSuggestions()
        elif suggestion_type == 'clarity':
            analyzer = ClaritySuggestions()
        else:
            return Response({'error': 'Invalid suggestion type'}, status=status.HTTP_400_BAD_REQUEST)

        # Apply the analysis to the content
        updated_text = analyzer.analyze(content)

        # Ensure updated_text is a string
        if isinstance(updated_text, dict):
            updated_text = str(updated_text)

        # Generate a PDF from the updated content
        pdf_buffer = BytesIO()
        pdf = canvas.Canvas(pdf_buffer, pagesize=letter)
        
        # Split text into lines and write each line to the PDF
        y_position = 750
        for line in updated_text.splitlines():
            pdf.drawString(100, y_position, line)
            y_position -= 20
            if y_position < 50:
                pdf.showPage()
                y_position = 750
        
        pdf.save()

        # Retrieve the PDF data from the buffer
        pdf_buffer.seek(0)
        pdf_content = pdf_buffer.getvalue()
        pdf_buffer.close()

        # Create a ContentFile to store the PDF in the model
        pdf_file = ContentFile(pdf_content)

        # Create a new improved document instance and save the PDF file
        improved_document = DocumentImproved.objects.create(
            content=updated_text,
            status='improved',
            suggestion_type=suggestion_type,
            user=request.user  # Set the user_id to the current authenticated user
        )

        # Attach the PDF file to the `document` field
        improved_document.document.save(f"improved_document_{improved_document.id}.pdf", pdf_file)

        # Serialize the improved document
        serializer = DocumentImprovedSerializer(improved_document)

        # Return the updated content along with serialized document data
        return Response({
            'updated_content': updated_text,
            'document': serializer.data
        }, status=status.HTTP_201_CREATED)


# views.py
class DocumentCombinedView(APIView):
    def post(self, request, *args, **kwargs):
        # Extract data from request body
        content = request.data.get('content')
        improved_content = request.data.get('improvedContent')

        if not content or not improved_content:
            return Response({"detail": "Both 'content' and 'improvedContent' are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Create a title or use a default one
        title = "Combined Document"

        data = {
            'title': title,
            'original_content': content,
            'improved_content': improved_content
        }

        serializer = DocumentCombinedSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)