from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djangoServer.testhub_auth.urls')),
    path('testHub/', include('djangoServer.testhub_structure.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

