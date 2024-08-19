from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

#Register, Login, User, Logout endpoints
urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),#Post path to handle register
    path('api/auth/login', LoginAPI.as_view()),#Post path to handle login
    path('api/auth/user', UserAPI.as_view()),#Get path to get user
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')#Post method for handling logout
]