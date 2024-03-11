
from urllib.parse import unquote
from django.core.exceptions import ValidationError
from django.db import transaction
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from djangoServer.testhub_auth.serializers import UserProfileDetailsSerializer
from djangoServer.testhub_structure.models import Course, Topic, MultipleChoiceTest, MultipleChoiceQuestion, PyTest, \
    SubmissionMultipleChoiceTest, SubmissionPyTest
from djangoServer.testhub_structure.permissions import IsTeacher
from djangoServer.testhub_structure.serializers import CourseSerializer, MultipleChoiceExamSerializer, \
    MultipleChoiceQuestionSerializer, PythonTestSerializer, PySubmissions, \
    MultipleChoiceTestSubmissionSerializer
from djangoServer.testhub_structure.utils import run_tests


class GetCoursesAndTopics(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CreateMultipleChoiceTest(APIView):
    permission_classes = [IsTeacher]

    def post(self, request):
        data = request.data
        user = request.user

        if not user.is_authenticated:
            return Response({"error": "Authentication required"}, status=401)

        topic = get_object_or_404(Topic, name=data.get('topic'))

        with transaction.atomic():
            multiple_choice_test = MultipleChoiceTest.objects.create(
                title=data.get('testTitle'),
                creator=user,
                topic=topic
            )

            for question in data.get('testQuestions', []):
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


class CreatePythonTest(APIView):
    permission_classes = [IsTeacher]

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


class SubmitMultipleChoiceTest(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, exam_name):
        multiple_questions_test = get_object_or_404(MultipleChoiceTest, title=exam_name)
        serializer = MultipleChoiceExamSerializer(multiple_questions_test)
        return Response(serializer.data)

    def post(self, request, exam_name):
        try:
            multiple_questions_test = get_object_or_404(MultipleChoiceTest, title=exam_name)
        except:
            return Response({"error": "Test not found"}, status=status.HTTP_404_NOT_FOUND)

        answers_data = request.data.get('questions')
        if not isinstance(answers_data, list):
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)

        question_ids = [el['questionId'] for el in answers_data]
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
                submitter=request.user,
                answers='|'.join(answers),
                correct_answers=correct_answers,
                multiple_choice_exam=multiple_questions_test
            )

        return Response({"message": "Successful submission!", 'submissionId': submission.pk},
                        status=status.HTTP_201_CREATED)


class GetMultipleChoiceTestSubmission(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, submission_id):
        try:
            submission = get_object_or_404(SubmissionMultipleChoiceTest, pk=submission_id)
            if submission.submitter != request.user:
                return Response({"error": "This submission was not made by you!"}, status=status.HTTP_403_FORBIDDEN)
        except SubmissionMultipleChoiceTest.DoesNotExist:
            return Response({"error": "Submission not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = MultipleChoiceTestSubmissionSerializer(submission, many=False)
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


class GetMultipleChoiceTestSingleQuestion(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, submission_id, question_id):
        try:
            submission = get_object_or_404(SubmissionMultipleChoiceTest, pk=submission_id)
            if submission.submitter != request.user:
                return Response({"error": "This submission was not made by you!"}, status=status.HTTP_403_FORBIDDEN)
        except SubmissionMultipleChoiceTest.DoesNotExist:
            return Response({"error": "Submission not found."}, status=status.HTTP_404_NOT_FOUND)

        for data in submission.answers.split("|"):
            current_question_id = int(data.split(' ')[0])
            if current_question_id == question_id:
                given_answer = int(data.split(' ')[1])
                question = get_object_or_404(MultipleChoiceQuestion, id=current_question_id)
                serializer = MultipleChoiceQuestionSerializer(question, many=False)
                data = serializer.data
                data['givenAnswer'] = given_answer
                return Response(data)


class SubmitPythonTest(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, name):
        name = unquote(name).replace('-', ' ')
        python_test = get_object_or_404(PyTest, title=name)
        submissions = PySubmissions(python_test.submissions
                            .filter(submitter=request.user).order_by('-submission_time')[:5], many=True)
        topic_name = python_test.topic.name
        topic_tasks = []

        for task in python_test.topic.multiple_choice_tests.all():
            topic_tasks.append({"type": "multiple-choice", "name": task.title})

        for task in python_test.topic.py_tests.all():
            topic_tasks.append({"type": "python", "name": task.title})

        serializer = PythonTestSerializer(python_test, context={'request': request}, many=False)
        data = serializer.data
        data['topicName'] = topic_name
        data['topicTasks'] = topic_tasks
        data['submissions'] = submissions.data

        return Response(data)

    def post(self, request, name):  # Error Handling
        user = request.user

        name = unquote(name).replace('-', ' ')
        python_test = get_object_or_404(PyTest, title=name)
        user_code = request.data['code']
        test_results = run_tests(python_test.unit_tests, user_code)

        num_of_correct_answers = test_results['score']
        failed_tests = '|'.join([err.split('AssertionError:')[1].strip() for _, err in test_results['failures']])
        number_of_errors = (len(test_results['errors']))

        # print(test_results)

        submission = SubmissionPyTest.objects.create(
            submitter=user,
            python_test=python_test,
            num_total_tests=test_results['number_of_tests'],
            num_correct_tests=num_of_correct_answers,
            incorrect_tests=failed_tests,
            num_error_tests=number_of_errors
        )

        return Response({"message": "Successful submission!", 'submissionId': submission.pk},
                        status=status.HTTP_201_CREATED)


class GetAllPySubmissions(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        submissions = SubmissionPyTest.objects.order_by('-submission_time')[:10]
        serializer = PySubmissions(submissions, many=True)
        return Response(serializer.data)


class MyProfile(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        user = request.user

        if not user.is_authenticated:
            return Response({"error": "Authentication required"}, status=401)

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


def calculate_average_grade(test_type: str, submissions) -> str:
    total_correct_points = {}
    total_total_points = {}

    for submission in submissions:
        if test_type == 'Python':
            submission_title = submission.python_test.title
            submission_correct_points = submission.num_correct_tests
            test_total_points = submission.num_total_tests
        else:
            submission_title = submission.multiple_choice_exam.title
            submission_correct_points = submission.correct_answers
            test_total_points = submission.multiple_choice_exam.questions.count()

        if submission_title not in total_correct_points.keys():
            total_correct_points[submission_title] = submission_correct_points
            total_total_points[submission_title] = test_total_points

        if submission_correct_points > total_correct_points[submission_title]:
            total_correct_points[submission_title] = submission_correct_points

    # print(total_correct_points)
    # print(total_total_points)

    if len(total_correct_points) > 0:
        avg_correct_points = sum(total_correct_points.values()) / len(total_correct_points)
    else:
        avg_correct_points = 0.0

    if len(total_total_points) > 0:
        avg_total_points = sum(total_total_points.values()) / len(total_total_points)
    else:
        avg_total_points = 0.0

    return f'{avg_correct_points:.2f}/{avg_total_points:.2f}'


class GetAllMultipleChoiceSubmissions(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        submissions = SubmissionMultipleChoiceTest.objects.order_by('-submission_time', '-id')[:10]
        serializer = MultipleChoiceTestSubmissionSerializer(submissions, many=True)
        return Response(serializer.data)
