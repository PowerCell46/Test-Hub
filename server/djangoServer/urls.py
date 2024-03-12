from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


def index(request):
    return render(request, 'index.html')


urlpatterns = [
    path('admin/', admin.site.urls, name='django-admin'),
    path('', index, name='home-page'),
    path('auth/', include('djangoServer.testhub_auth.urls')),
    path('testHub/', include('djangoServer.testhub_structure.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

