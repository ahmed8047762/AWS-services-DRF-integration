from rest_framework import serializers
from .models import Post
from django.conf import settings

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'media']
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.media and hasattr(instance.media, 'url'):
            # Use the AWS S3 URL directly
            data['media'] = f"http://{settings.AWS_S3_CUSTOM_DOMAIN}/{str(instance.media)}"
        return data