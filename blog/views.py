from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostSerializer
from django.conf import settings
from .utils import upload_file_s3  # Import the S3 upload function

from django.shortcuts import render

import logging

logger = logging.getLogger(__name__)

def index(request):
    return render(request, 'index.html')


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def create(self, request, *args, **kwargs):
        logger.info("Received request for new post creation")
        logger.debug(f"Files in request: {request.FILES}")
        logger.debug(f"Data in request: {request.data}")

        # Create a mutable copy of the data
        data = request.data.dict() if hasattr(request.data, 'dict') else request.data.copy()
        
        # If there's a file in request.FILES, add it to the data
        if 'media' in request.FILES:
            data['media'] = request.FILES["media"]
        
        # Create serializer with the modified data
        serializer = self.get_serializer(data=data)
        
        if serializer.is_valid():
            instance = serializer.save()
            logger.info(f"Post created successfully with media: {instance.media}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Create a mutable copy of the data
        data = request.data.dict() if hasattr(request.data, 'dict') else request.data.copy()
        
        # If there's a file in request.FILES, add it to the data
        if 'media' in request.FILES:
            data['media'] = request.FILES['media']
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        
        if serializer.is_valid():
            instance = serializer.save()
            logger.info(f"Post updated successfully with media: {instance.media}")
            return Response(serializer.data)
        else:
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
