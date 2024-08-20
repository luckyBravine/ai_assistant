import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user_data():
    return {
        'username': 'testuser',
        'email': 'testuser@example.com',
        'password': 'strong_password_123',
    }

@pytest.fixture
def create_user_and_token(api_client, user_data):
    # Register the user and get the token
    url = reverse('register')
    response = api_client.post(url, user_data, format='json')
    assert response.status_code in [status.HTTP_201_CREATED, status.HTTP_200_OK]  # Allow both 201 and 200
    token = response.data.get('token')
    assert token is not None
    return token

# Test Register API
@pytest.mark.django_db
def test_register_api(api_client, user_data):
    url = reverse('register')
    response = api_client.post(url, user_data, format='json')
    assert response.status_code in [status.HTTP_201_CREATED, status.HTTP_200_OK]  # Adjust for both cases
    assert 'user' in response.data
    assert 'token' in response.data

# Test Login API
@pytest.mark.django_db
def test_login_api(api_client, user_data):
    # First, register the user
    register_url = reverse('register')
    api_client.post(register_url, user_data, format='json')

    # Now, attempt login
    url = reverse('login')
    login_data = {
        'username': user_data['username'],
        'password': user_data['password']
    }
    response = api_client.post(url, login_data, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'user' in response.data
    assert 'token' in response.data

# Test Get User API (Authenticated)
@pytest.mark.django_db
def test_get_user_api(api_client, create_user_and_token):
    token = create_user_and_token
    api_client.credentials(HTTP_AUTHORIZATION='Token ' + token)
    url = reverse('get_user')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK  # Ensure 200 OK for retrieval
    assert 'username' in response.data

# Test Get User API (Unauthenticated)
@pytest.mark.django_db
def test_get_user_api_unauthenticated(api_client):
    url = reverse('get_user')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
