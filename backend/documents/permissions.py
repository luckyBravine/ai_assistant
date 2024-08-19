from rest_framework import permissions, viewsets
from .serializer import DocumentImprovedSerializer

class IsOwner(permissions.BasePermission):
    # """
    # Custom permission to only allow owners of an object to access it.
    # """

    def has_object_permission(self, request, view, obj):
        # obj.user_id is the ForeignKey field that links the document to the user
        return obj.user_id == request.user
    


class DocumentImprovedViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    serializer_class = DocumentImprovedSerializer
    
    def get_queryset(self):
        return self.request.user.improved_documents.all()
    
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)
        
        
        
class DocumentOriginalViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    serializer_class = DocumentImprovedSerializer
    
    def get_queryset(self):
        return self.request.user.original_document.all()
    
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)