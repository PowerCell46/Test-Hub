from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from djangoServer.testhub_auth.models import UserProfile
from djangoServer.testhub_auth.serializers import UserRegistrationSerializer, UserProfileDetailsSerializer, \
    UserSerializer
from djangoServer.testhub_auth.utils import calculate_average_grade, update_user_details, \
    send_email
from djangoServer.testhub_structure.models import SubmissionPyTest, SubmissionMultipleChoiceTest
from djangoServer.testhub_structure.permissions import IsUnauthenticated


class UserRegister(APIView):
    permission_classes = [IsUnauthenticated]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            send_email(user.username, user.email, 'Register')
            return Response({
                'user': serializer.data,
                'token': token.key,
                'is_teacher': user.groups.filter(name='Teachers').exists()
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = [IsUnauthenticated]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            if user.user_details.is_deleted:
                return Response({'error': 'Invalid Username or Password'}, status=status.HTTP_404_NOT_FOUND)
            token, created = Token.objects.get_or_create(user=user)
            user_serializer = UserSerializer(user)
            return Response({
                'token': token.key,
                'user': user_serializer.data,
                'is_teacher': user.groups.filter(name='Teachers').exists()
            }, status=status.HTTP_200_OK)
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


class MyProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

        user_details_serializer = UserProfileDetailsSerializer(
            user.user_details, context={'request': request}, many=False)
        user_data = user_details_serializer.data
        user_data['firstName'] = user.first_name
        user_data['lastName'] = user.last_name
        user_data['dateJoined'] = user.date_joined

        total_py_submissions = SubmissionPyTest.objects.filter(submitter=user).count()
        user_data['pySubmissionsCount'] = total_py_submissions
        user_data['averagePythonGrade'] = (
            calculate_average_grade('Python', SubmissionPyTest.objects.filter(submitter=user)))

        user_data['multipleChoiceSubmissionsCount'] = \
            SubmissionMultipleChoiceTest.objects.filter(submitter=user).count()
        user_data['averageMultipleChoiceGrade'] = (
            calculate_average_grade('MultipleChoice', SubmissionMultipleChoiceTest.objects.filter(submitter=user)))

        courses_names = []

        for submission in (SubmissionPyTest.objects.filter(submitter=user)):
            courses_names.append(submission.python_test.topic.course.name)
        for submission in (SubmissionMultipleChoiceTest.objects.filter(submitter=user)):
            courses_names.append(submission.multiple_choice_exam.topic.course.name)
        courses_names = set(courses_names)

        courses_data = []
        for course in courses_names:
            course_python_tasks = SubmissionPyTest.objects.filter(python_test__topic__course__name=course)
            course_multiple_choice_tasks = (
                SubmissionMultipleChoiceTest.objects.filter(multiple_choice_exam__topic__course__name=course))
            current_course_python_avg_grade = calculate_average_grade('Python', course_python_tasks)
            current_course_multiple_choice_avg_grade = (
                calculate_average_grade('MultipleChoice', course_multiple_choice_tasks))
            courses_data.append({
                "course_name": course,
                "py_test_submissions": course_python_tasks.count(),
                "multiple_choice_submissions": course_multiple_choice_tasks.count(),
                "avg_python_grade": current_course_python_avg_grade,
                "avg_multiple_choice_grade": current_course_multiple_choice_avg_grade})

        user_data['courses_data'] = courses_data

        return Response(user_data)


class EditProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

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

        user_profile = UserProfile.objects.get(user=request.user)
        update_user_details(first_name, last_name, gender, telephone, nationality, profile_picture, user_profile,
                            user=request.user)
        return Response("Successful Edit!", status=status.HTTP_200_OK)


class DeleteProfile(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        request.user.user_details.soft_delete()
        send_email(request.user.username, request.user.email, 'Delete Profile')
        Token.objects.filter(user=request.user).delete()
        return Response("Successful Delete!", status=status.HTTP_200_OK)
