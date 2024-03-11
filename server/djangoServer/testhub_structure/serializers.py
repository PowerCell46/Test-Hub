from rest_framework import serializers
from .models import Course, Topic, PyTest, MultipleChoiceTest, MultipleChoiceQuestion, SubmissionMultipleChoiceTest, \
    SubmissionPyTest
from ..testhub_auth.serializers import UserProfileDetailsSerializer, UserRegistrationSerializer


class PyTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PyTest
        fields = ['id', 'title']


class MultipleChoiceTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleChoiceTest
        fields = ['id', 'title']


class TopicSerializer(serializers.ModelSerializer):
    py_tests = PyTestSerializer(many=True, read_only=True)
    multiple_choice_tests = MultipleChoiceTestSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = ['id', 'name', 'py_tests', 'multiple_choice_tests']


class CourseSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'topics']


class MultipleChoiceQuestionSerializer(serializers.ModelSerializer):  # Used for a single question from a MCQ submission
    class Meta:
        model = MultipleChoiceQuestion
        fields = ['id', 'question_title', 'first_option',
                  'second_option', 'third_option', 'fourth_option',
                  'correct_answer']


class MultipleChoiceExamSerializer(serializers.ModelSerializer):  # Used for Submit MCQ Test
    questions = MultipleChoiceQuestionSerializer(many=True, read_only=True)

    class Meta:
        model = MultipleChoiceTest
        fields = ['title', 'questions']


class MultipleChoiceTestSubmissionSerializer(serializers.ModelSerializer):  # Used for MCQ Submission
    multiple_choice_exam = MultipleChoiceExamSerializer(many=False, read_only=True)
    submitter = UserRegistrationSerializer(many=False, read_only=True)

    class Meta:
        model = SubmissionMultipleChoiceTest
        fields = ['id', 'submission_time', 'answers', 'correct_answers', 'multiple_choice_exam', 'submitter']


class PythonTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PyTest
        fields = ['id', 'title', 'description']


class PySubmissions(serializers.ModelSerializer):
    submitter_name = serializers.SerializerMethodField()
    python_test_title = serializers.SerializerMethodField()

    class Meta:
        model = SubmissionPyTest
        fields = ['id', 'submitter_name', 'python_test_title', 'num_total_tests',
                  'num_correct_tests', 'incorrect_tests', 'num_error_tests', 'submission_time']

    def get_submitter_name(self, obj):
        return obj.submitter.username

    def get_python_test_title(self, obj):
        return obj.python_test.title

