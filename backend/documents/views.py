from django.shortcuts import render
from .models import Files
from .serializer import FileSerializers
from rest_framework import viewsets


# Create your views here.
# views with the help of serializer converts the code to json format

class FileViewSet(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FileSerializers