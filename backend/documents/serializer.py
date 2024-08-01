from rest_framework import serializers
from .models import Files

#this file converts the backend to a code that can be understood by javascript

class FileSerializers(serializers.ModelSerializer):
    class Meta:
        model = Files #our documents upload model
        fields = ['id', 'document'] #the columns from the documents table
