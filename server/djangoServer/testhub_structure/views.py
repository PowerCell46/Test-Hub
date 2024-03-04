from django.core.exceptions import ValidationError
from django.db import transaction
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from djangoServer.testhub_structure.models import Course, Topic, MultipleChoiceTest, MultipleChoiceQuestion, PyTest, \
    SubmissionMultipleChoiceTest
from djangoServer.testhub_structure.permissions import IsTeacher
from djangoServer.testhub_structure.serializers import CourseSerializer, MultipleChoiceExamSerializer, \
    MultipleChoiceSubmissionSerializer


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


class MultipleChoiceExam(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, examName):
        multiple_questions_exam = MultipleChoiceTest.objects.get(title=examName)
        serializer = MultipleChoiceExamSerializer(multiple_questions_exam)
        return Response(serializer.data)

    def post(self, request, examName):
        user = request.user

        if not user.is_authenticated:
            return Response({"error": "Authentication required"}, status=401)

        try:
            multiple_questions_exam = MultipleChoiceTest.objects.get(title=examName)
        except MultipleChoiceTest.DoesNotExist:
            return Response({"error": "Exam not found"}, status=status.HTTP_404_NOT_FOUND)

        answers_data = request.data.get('questions')
        if not isinstance(answers_data, list):
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)

        question_ids = [d['questionId'] for d in answers_data]
        questions = MultipleChoiceQuestion.objects.filter(pk__in=question_ids)

        if len(questions) != len(answers_data):
            return Response({"error": "One or more questions not found"}, status=status.HTTP_404_NOT_FOUND)

        answers = []
        correct_answers = 0
        with transaction.atomic():
            for q_data in answers_data:
                question = next((q for q in questions if q.id == q_data['questionId']), None)
                if question and question.correct_answer == int(q_data['selectedValue']):
                    correct_answers += 1
                answers.append(f"{q_data['questionId']} {q_data['selectedValue']}")

            submission = SubmissionMultipleChoiceTest.objects.create(
                submitter=user,
                answers='|'.join(answers),
                correct_answers=correct_answers,
                multiple_choice_exam=multiple_questions_exam
            )

        return Response({"message": "Successful submission!", 'submissionId': submission.pk},
                        status=status.HTTP_201_CREATED)


class GetMultipleChoiceTestSubmission(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, submissionId):
        submission = SubmissionMultipleChoiceTest.objects.get(pk=submissionId)
        serializer = MultipleChoiceSubmissionSerializer(submission, many=False)
        data = serializer.data
        data['total_questions'] = submission.multiple_choice_exam.questions.count()
        answers = []
        for index, info in enumerate(data['answers'].split('|'), start=1):
            question_id = int(info.split(' ')[0])
            question = MultipleChoiceQuestion.objects.get(pk=question_id)
            answers.append({
                'questionNumber': index,
                'questionId': question_id,
                'valid': int(info.split(' ')[1]) == question.correct_answer
                })
        data['answers'] = answers
        return Response(data)
