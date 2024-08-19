from rest_framework import serializers
from .models import DocumentImproved, DocumentCombined, DocumentOriginal


#original document serializer
class DocumentOriginalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentOriginal
        fields = ['id', 'document', 'upload_date', 'status', 'user']


#improved document serializer
class DocumentImprovedSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentImproved
        fields = ['id', 'document', 'upload_date', 'status', 'suggestion_type', 'user']


#combined document serializer
class DocumentCombinedSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentCombined
        fields = ['id', 'title', 'original_content', 'improved_content']