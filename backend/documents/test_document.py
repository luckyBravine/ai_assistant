import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from io import BytesIO

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user(db):
    return User.objects.create_user(username='testuser', password='testpass')

@pytest.mark.django_db
def test_upload_original_document(api_client, user):
    api_client.force_authenticate(user=user)

    url = reverse('upload_original_document')
    document_data = BytesIO(b'Test document content')
    document_data.name = 'test.pdf'
    
    response = api_client.post(url, {
        'document': document_data,
    }, format='multipart')

    assert response.status_code == status.HTTP_201_CREATED
    assert 'content' in response.data


@pytest.mark.django_db
def test_upload_improved_document(api_client, user):
    api_client.force_authenticate(user=user)

    url = reverse('upload_improved_document', args=['grammar'])
    content = 'This is a test sentence with a grammar error.'

    response = api_client.post(url, {
        'content': content,
        'suggestionType': 'grammar'
    }, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert 'updated_content' in response.data
    assert 'document' in response.data


@pytest.mark.django_db
def test_combined_document_creation(api_client, user):
    api_client.force_authenticate(user=user)

    url = reverse('document_combined_create')
    original_content = "Original document content."
    improved_content = "Improved document content."

    response = api_client.post(url, {
        'content': original_content,
        'improvedContent': improved_content
    }, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert 'original_content' in response.data
    assert 'improved_content' in response.data
