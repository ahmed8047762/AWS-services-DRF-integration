from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('blog.urls')),  # Include the blog app URLs under /api/
]

# Serve static and media files in development
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve React frontend - catch all other URLs
urlpatterns += [
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]