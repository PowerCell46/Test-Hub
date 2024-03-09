from datetime import datetime

from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, FileExtensionValidator
from django.db import models


class Course(models.Model):  # Python Basics
    name = models.CharField(max_length=25, validators=[MinLengthValidator(3)])
    description = models.TextField(null=True, blank=True)
    creator = models.ForeignKey(to=User, on_delete=models.DO_NOTHING, related_name='courses')  # Only administrators

    def __str__(self):
        return f'"{self.name}", created by {self.creator}.'


class Topic(models.Model):  # For & While Loops
    name = models.CharField(max_length=25, validators=[MinLengthValidator(3)])
    course = models.ForeignKey(to=Course, on_delete=models.CASCADE, related_name='topics')
    creator = models.ForeignKey(to=User, on_delete=models.DO_NOTHING, related_name='topics')

    def __str__(self):
        return f'"{self.name}" from "{self.course.name}".'


class PyTest(models.Model):  # Odd Even Sum
    title = models.CharField(max_length=25, validators=[MinLengthValidator(3)])
    description = models.FileField(
        upload_to='py_tests_descriptions/',
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docs'])])
    unit_tests = models.TextField()
    creator = models.ForeignKey(to=User, on_delete=models.DO_NOTHING, related_name='py_tests')
    topic = models.ForeignKey(to=Topic, on_delete=models.CASCADE, related_name='py_tests')


class MultipleChoiceTest(models.Model):  # Python Advanced Theoretical Exam
    title = models.CharField(max_length=25, validators=[MinLengthValidator(3)])
    creator = models.ForeignKey(to=User, on_delete=models.DO_NOTHING, related_name='multiple_choice_tests')
    topic = models.ForeignKey(to=Topic, on_delete=models.CASCADE, related_name='multiple_choice_tests')


class MultipleChoiceQuestion(models.Model):  # What is the difference between list and tuple?
    OPTION_MAX_LENGTH = 50
    OPTION_MIN_LENGTH = 1
    test = models.ForeignKey(to=MultipleChoiceTest, on_delete=models.CASCADE, related_name='questions')
    question_title = models.CharField(max_length=100, validators=[MinLengthValidator(5)])
    first_option = models.CharField(max_length=OPTION_MAX_LENGTH, validators=[MinLengthValidator(OPTION_MIN_LENGTH)])
    second_option = models.CharField(max_length=OPTION_MAX_LENGTH, validators=[MinLengthValidator(OPTION_MIN_LENGTH)])
    third_option = models.CharField(max_length=OPTION_MAX_LENGTH, validators=[MinLengthValidator(OPTION_MIN_LENGTH)])
    fourth_option = models.CharField(max_length=OPTION_MAX_LENGTH, validators=[MinLengthValidator(OPTION_MIN_LENGTH)])
    correct_answer = models.PositiveIntegerField(choices=((1, 1), (2, 2), (3, 3), (4, 4)))


class SubmissionMultipleChoiceTest(models.Model):
    submitter = models.ForeignKey(to=User, on_delete=models.DO_NOTHING, related_name='multi_choice_submissions')
    answers = models.TextField()  # data format: questionId selectedValue|questionId selectedValue
    correct_answers = models.PositiveIntegerField()
    multiple_choice_exam = models.ForeignKey(to=MultipleChoiceTest, on_delete=models.DO_NOTHING,
                                             related_name='submissions')
    submission_time = models.DateTimeField(auto_now_add=True)


class SubmissionPyTest(models.Model):
    submitter = models.ForeignKey(to=User, on_delete=models.DO_NOTHING, related_name='py_submissions')
    python_test = models.ForeignKey(to=PyTest, on_delete=models.CASCADE, related_name='submissions')
    num_total_tests = models.PositiveIntegerField()
    num_correct_tests = models.PositiveIntegerField()
    incorrect_tests = models.TextField()
    num_error_tests = models.PositiveIntegerField()
    submission_time = models.DateTimeField(auto_now_add=True)
