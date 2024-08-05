from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentOriginalView, DocumentImprovedView, DocumentCombinedView

router = DefaultRouter()
# router.register('files', FileViewSet, basename='files')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/upload/original/', DocumentOriginalView.as_view(), name='upload_original_document'),
    path('api/document/original/<int:doc_id>/', DocumentOriginalView.as_view(), name='get_original_document'),
    path('api/upload/improved/', DocumentImprovedView.as_view(), name='upload_improved_document'),
    path('api/document/improved/<int:doc_id>/', DocumentImprovedView.as_view(), name='get_improved_document'),
    path('api/document/combined/create/<int:original_id>/<int:improved_id>/', DocumentCombinedView.as_view(), name='create_combined_document'),
    path('api/document/combined/<int:combined_id>/', DocumentCombinedView.as_view(), name='get_combined_document'),
]