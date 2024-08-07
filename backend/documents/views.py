from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import DocumentOriginal, DocumentImproved, DocumentCombined
from .serializer import DocumentOriginalSerializer, DocumentImprovedSerializer, DocumentCombinedSerializer
from .nltk_analysis import GrammarSuggestions, StyleSuggestions, ClaritySuggestions


# def get_document(request, document_id, suggestion_type):
#     document = get_object_or_404(Document, pk=document_id)
#     text = document.file.read().decode('utf-8')

#     if suggestion_type == 'grammar':
#         analyzer = GrammarSuggestions()
#     elif suggestion_type == 'style':
#         analyzer = StyleSuggestions()
#     elif suggestion_type == 'clarity':
#         analyzer = ClaritySuggestions()
#     else:
#         return JsonResponse({'error': 'Invalid suggestion type'}, status=400)

#     suggestions = analyzer.analyze(text)
#     return JsonResponse({'suggestions': suggestions})

#endpoints creations
class DocumentOriginalView(APIView):
    def post(self, request):
        serializer = DocumentOriginalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        doc_id = kwargs.get('doc_id')
        document = get_object_or_404(DocumentOriginal, id=doc_id)
        serializer = DocumentOriginalSerializer(document)
        return Response(serializer.data)
    
    def analyze_document(self, request, doc_id, suggestion_type):
        document = get_object_or_404(DocumentOriginal, id=doc_id)
        text = document.file.read().decode('utf-8')
        
        if suggestion_type == 'grammar':
            analyzer = GrammarSuggestions()
        elif suggestion_type == 'style':
            analyzer = StyleSuggestions()
        elif suggestion_type == 'clarity':
            analyzer = ClaritySuggestions()
        else:
            return Response({'error': 'Invalid suggestion type'}, status=status.HTTP_400_BAD_REQUEST)
        
        suggestions = analyzer.analyze(text)
        return Response({'suggestions': suggestions})
class DocumentImprovedView(APIView):
    def post(self, request):
        serializer = DocumentImprovedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def get(self, request, *args, **kwargs):
    #     doc_id = kwargs.get('doc_id')
    #     document = get_object_or_404(DocumentImproved, id=doc_id)
    #     serializer = DocumentImprovedSerializer(document)
    #     return Response(serializer.data)


class DocumentCombinedView(APIView):
    def post(self, request, *args, **kwargs):
        original_id = kwargs.get('original_id')
        improved_id = kwargs.get('improved_id')
        
        original_document = get_object_or_404(DocumentOriginal, id=original_id)
        improved_document = get_object_or_404(DocumentImproved, id=improved_id)
        
        original_content = original_document.document.read().decode('utf-8')
        improved_content = improved_document.document.read().decode('utf-8')

        data = {
            'title': f"Combined: {original_document.title} + {improved_document.title}",
            'original_document': original_document.id,
            'improved_document': improved_document.id,
            'original_content': original_content,
            'improved_content': improved_content
        }

        serializer = DocumentCombinedSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        combined_id = kwargs.get('combined_id')
        combined_document = get_object_or_404(DocumentCombined, id=combined_id)
        serializer = DocumentCombinedSerializer(combined_document)
        return Response(serializer.data)