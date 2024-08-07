from rest_framework import serializers
from .models import DocumentImproved, DocumentCombined, DocumentOriginal


#original document serializer
class DocumentOriginalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentOriginal
        fields = ['id', 'document', 'upload_date', 'status', 'user_id']


#improved document serializer
class DocumentImprovedSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentImproved
        fields = ['id', 'document', 'upload_date', 'status']


#combined document serializer
class DocumentCombinedSerializer(serializers.ModelSerializer):
    #bring in both original and improved document
    original_document = DocumentOriginalSerializer()
    improved_document = DocumentImprovedSerializer()

    class Meta:
        model = DocumentCombined
        #columns to hold the details
        fields = ['id', 'title', 'original_document', 'original_content', 'improved_document', 'improved_content', 'upload_date', 'status']
        
        def create(self, validated_data):
            original_document_data = validated_data.pop('original_document')
            improved_document_data = validated_data.pop('improved_document')

            original_document = DocumentOriginal.objects.create(**original_document_data)
            improved_document = DocumentOriginal.objects.create(**improved_document_data)
            
            #create the combined table
            combined_document = DocumentCombined.objects.create(
                original_document=original_document,
                improved_document = improved_document,
                **validated_data
            )
            
            return combined_document