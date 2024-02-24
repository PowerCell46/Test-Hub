from django.urls import path

from djangoServer.testhub_auth.views import UserRegister


urlpatterns = [
    path('register/', UserRegister.as_view(), name='user-register')
]
