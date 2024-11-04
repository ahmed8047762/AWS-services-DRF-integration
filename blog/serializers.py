from rest_framework import serializers
from .models import Post
import base64
from django.core.files.base import ContentFile
import uuid

class PostSerializer(serializers.ModelSerializer):
    media_data = serializers.CharField(write_only=True, required=False)  # For receiving base64 data
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'media', 'media_data']
        read_only_fields = ['media']  # media field will be set programmatically
    
    def validate_media(self, value):
        if value and not isinstance(value, str):
            if not hasattr(value, 'content_type'):
                raise serializers.ValidationError("Invalid media format")
        return value