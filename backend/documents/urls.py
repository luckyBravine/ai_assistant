from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentOriginalView, DocumentImprovedView, DocumentCombinedView

router = DefaultRouter()

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/upload/original/', DocumentOriginalView.as_view(), name='upload_original_document'), #Post the original document
    path('api/document/original/<int:doc_id>/', DocumentOriginalView.as_view(), name='get_original_document'), #Get the original document by ID
    path('api/upload/improved/<str:suggestion_type>/', DocumentImprovedView.as_view(), name='upload_improved_document'),#Post the improved document with the suggestionType
    path('api/document/improved/<int:doc_id>/', DocumentImprovedView.as_view(), name='get_improved_document'), #Get the improved document by ID 
    path('api/document/combined/create/', DocumentCombinedView.as_view(), name='document_combined_create'), #Post both the original and the updated content
    path('api/document/combined/<int:combined_id>/', DocumentCombinedView.as_view(), name='document_combined_detail'), #Get the combined content by ID 
]