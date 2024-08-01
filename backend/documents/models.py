from django.db import models

# Create your models here.

class Files(models.Model):
    document = models.FileField(upload_to='store/documents/') #our schema

    #columns 
    def __str__(self):
        return self.document