from django.contrib.auth import authenticate
from django.db import transaction
from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from djangoServer.testhub_auth.models import UserProfile
from djangoServer.testhub_auth.serializers import UserRegistrationSerializer, UserProfileDetailsSerializer


class UserRegister(APIView):
    permission_classes = [AllowAny]  # ALLOW ONLY NOT AUTHENTICATED USERS

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': serializer.data,
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):  # ALLOW ONLY NOT AUTHENTICATED USERS
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Username or Password'}, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class EditProfile(APIView):

    def get(self, request):
        user = request.user

        if not user.is_authenticated:
            return Response({"error": "Authentication required"}, status=401)

        user_details_serializer = UserProfileDetailsSerializer(
            user.user_details, context={'request': request}, many=False)
        user_data = user_details_serializer.data
        user_data['firstName'] = user.first_name
        user_data['lastName'] = user.last_name
        user_data['email'] = user.email
        user_data['username'] = user.username
        return Response(user_data)

    def post(self, request):
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        gender = request.data.get('gender')
        telephone = request.data.get('telephone')
        nationality = request.data.get('nationality')
        profile_picture = request.FILES.get('profilePicture') if 'profilePicture' in request.FILES else None

        print(first_name, last_name, gender, nationality, telephone, profile_picture)
        user_profile = UserProfile.objects.get(user=request.user)
        update_user_details(first_name, last_name, gender, telephone, nationality, profile_picture, user_profile,
                            user=request.user)
        return Response("Successful Edit!", status=status.HTTP_200_OK)



@transaction.atomic
def update_user_details(first_name, last_name, gender, telephone, nationality, profile_picture, user_profile: UserProfile, user) -> None:
    if first_name != user.first_name and first_name != '':
        user.first_name = first_name
    if last_name != user.last_name and last_name != '':
        user.last_name = last_name
    if gender != user_profile.gender and gender != '':
        user_profile.gender = gender
    if telephone != user_profile.phone_number and telephone != '':
        user_profile.phone_number = telephone
    if nationality != user_profile.nationality and nationality != '':
        user_profile.nationality = nationality
    if profile_picture != user_profile.image and profile_picture is not None:
        user_profile.image = profile_picture
    user.save()
    user_profile.save()


class DeleteProfile(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        request.user.user_details.soft_delete()
        Token.objects.filter(user=request.user).delete()
        return Response("Successful Delete!", status=status.HTTP_200_OK)
