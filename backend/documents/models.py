from django.db import models
from django.contrib.auth.models import User #lets bring in the user so as to get the user_id


#creation of original document model
class DocumentOriginal(models.Model):
    #store the document in a folder according to their status
    document = models.FileField(upload_to='store/document/original')
    #set the status
    status = models.CharField(max_length=10, default='original')
    #get the user id as a foreign key
    user_id = models.ForeignKey(User, related_name='original_documents', on_delete=models.CASCADE, null=True) 
    #add the date and time of upload
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.document
    

#creation of improved document model
class DocumentImproved(models.Model):
    #store the document in a folder according to their status
    document = models.FileField(upload_to='store/documents/improved')
    #set the status
    status = models.CharField(max_length=10, default='improved')
    #get the user id as a foreign key
    user_id = models.ForeignKey(User, related_name='improved_documents', on_delete=models.CASCADE, null=True) 
    #add the date and time of upload
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.document
    

#lets create a combined document model to store the content of  
class DocumentCombined(models.Model):
    title = models.CharField(max_length=255)
    #getting the original documents
    original_document = models.ForeignKey(DocumentOriginal, on_delete=models.CASCADE, related_name='original_docs') 

    #getting the improved documents
    improved_document = models.ForeignKey(DocumentImproved, on_delete=models.CASCADE, related_name='improved_docs')

    #store the content of the original document
    original_content = models.TextField()

     #store the content of the improved document
    improved_content = models.TextField()

    def __str__(self) -> str:
        return self.title