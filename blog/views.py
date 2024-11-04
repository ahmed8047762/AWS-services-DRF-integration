from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostSerializer
from .utils import upload_file_s3  # Import the S3 upload function

from django.shortcuts import render

def index(request):
    return render(request, 'index.html')


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)  # Accept both multipart and JSON

    def create(self, request, *args, **kwargs):
        media = request.FILES.get('media')
        data = request.data.copy()

        if media:
            try:
                file_extension = media.name.split('.')[-1]
                s3_file_name = f'blog_media/{data.get("title")}.{file_extension}'
                media_url = upload_file_s3(media, s3_file_name)
                data['media'] = media_url
            except Exception as e:
                return Response(
                    {'error': f'Error uploading to S3: {str(e)}'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()

        media = request.FILES.get('media')
        if media:
            try:
                file_extension = media.name.split('.')[-1]
                s3_file_name = f'blog_media/{data.get("title")}.{file_extension}'
                media_url = upload_file_s3(media, s3_file_name)
                data['media'] = media_url
            except Exception as e:
                return Response(
                    {'error': f'Error uploading to S3: {str(e)}'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)