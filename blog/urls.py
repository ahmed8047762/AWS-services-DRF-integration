from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, index

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', index, name='index'),  # Add this for serving the frontend
    path('api/', include(router.urls)),
]