from django.urls import path

from djangoServer.testhub_auth.views import UserRegister, UserLogin, UserLogout, EditProfile, DeleteProfile

urlpatterns = [
    path('register/', UserRegister.as_view(), name='user-register'),
    path('login/', UserLogin.as_view(), name='user-login'),
    path('logout/', UserLogout.as_view(), name='user-logout'),
    path('editProfile/', EditProfile.as_view(), name='edit-profile'),
    path('deleteProfile/', DeleteProfile.as_view(), name='delete-profile')
]
