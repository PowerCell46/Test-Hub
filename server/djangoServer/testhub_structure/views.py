from django.core.exceptions import ValidationError
from django.db import transaction
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from djangoServer.testhub_structure.models import Course, Topic, MultipleChoiceTest, MultipleChoiceQuestion, PyTest
from djangoServer.testhub_structure.permissions import IsTeacher
from djangoServer.testhub_structure.serializers import CourseSerializer, MultipleChoiceExamSerializer


class CreateTopic(APIView):
    permission_classes = [IsTeacher]

    def post(self, request):

        return Response({'message': "Only teacher can see this."})


class GetCoursesAndTopics(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


example_data = {
    'examTitle': 'Sum two numbers',
    'course': 'Python Basics',
    'topic': 'First Steps in Coding',
    'examQuestions': [
            {'id': 1, 'title': 'Question', 'optionA': 'A',
             'optionB': 'B', 'optionC': 'C', 'optionD': 'D',
             'correctAnswer': 1}
        ]
}


class CreateMultipleChoiceExam(APIView):  # Only teachers can create
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data
        user = request.user

        if not user.is_authenticated:
            return Response({"error": "Authentication required"}, status=401)

        topic = get_object_or_404(Topic, name=data.get('topic'))

        with transaction.atomic():
            multiple_choice_test = MultipleChoiceTest.objects.create(
                title=data.get('examTitle'),
                creator=user,
                topic=topic
            )

            for question in data.get('examQuestions', []):
                MultipleChoiceQuestion.objects.create(
                    test=multiple_choice_test,
                    question_title=question.get('title'),
                    first_option=question.get('optionA'),
                    second_option=question.get('optionB'),
                    third_option=question.get('optionC'),
                    fourth_option=question.get('optionD'),
                    correct_answer=question.get('correctAnswer')
                )

        return Response({'message': 'Multiple choice exam created successfully!'})


class CreatePythonExam(APIView):  # Only teachers can create
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        title = request.data.get('title')
        description_file = request.FILES.get('description') if 'description' in request.FILES else None
        unit_tests = request.data.get('unitTests')
        topic = get_object_or_404(Topic, name=request.data.get('topic'))
        user = request.user

        if not user.is_authenticated:
            return Response({"error": "Authentication required"}, status=401)

        if not title or not unit_tests or not description_file or not topic:
            return Response({'error': 'Missing required fields.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                pytest = PyTest(
                    title=title,
                    description=description_file,
                    unit_tests=unit_tests,
                    creator=user,
                    topic=topic)
                pytest.save()
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Python Test created successfully!'}, status=status.HTTP_201_CREATED)


class GetMultipleChoiceExam(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, examName):
        multiple_questions_exam = MultipleChoiceTest.objects.get(title=examName)
        serializer = MultipleChoiceExamSerializer(multiple_questions_exam)
        return Response(serializer.data)
    