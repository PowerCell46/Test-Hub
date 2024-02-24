# from django.contrib.auth import authenticate, login, logout
# from django.shortcuts import render
#
# from django.contrib.auth.models import User
#
#
# # Create user
# user = User.objects.create_user('PowerCell46', 'makotsevo.fan@gmail.com', 'ivanPeter')
#
#
# # Authenticate
# user1 = authenticate(username='PowerCell46', password='ivanPeter')
# if user:
#     ...  # Valid
# else:
#     ...  # Not valid
#
#
# # Authentication in Web Requests
# if request.user.is_authenticated:
#     ...
# else:
#     ...
#
#
# # To log in a user
# def index(request):
#     some_user = User.objects.get(username='Peter')
#     print(request.user.__class__.__name__)
#     login(request, some_user)
#     print(request.user.__class__.__name__)
#     return render(request, 'home_page.html')
#
#
# def logout_page(request):
#     print(request.user.__class__.__name__)
#     logout(request, some_user)
#     print(request.user.__class__.__name__)
#     return render(request, 'logout_page.html')
#
#
# @login_required(login_url='login')
# def index(req):
#     return render(req, 'index.html')
#
#
# @allowed_groups(['Users'])
# def index(req):
#     articles = Article.objects.all()
#     return render(req, 'index.html', {'aticles': articles})
#
#
# class RegistrationForm(UserCreationForm):
#     email = models.EmailField(required=True)
#
#     class Meta:
#         model = User
#         fields = ('username', 'email', 'first_name', 'last_name')
#
#         def save(self, commit=True):
#             # clean the dat and save the user
#             ...
from django.shortcuts import render



