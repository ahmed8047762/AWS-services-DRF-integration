from django.db import models
import logging

logger = logging.getLogger(__name__)

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    media = models.FileField(upload_to='blog_media/', blank=True, null=True, max_length=500)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        logger.debug(f"Saving Post with media: {self.media}")
        super().save(*args, **kwargs)
        logger.debug(f"Saved Post, media is now: {self.media}")