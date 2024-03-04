from django.urls import path

from djangoServer.testhub_structure.views import GetCoursesAndTopics, CreateMultipleChoiceExam, CreatePythonExam, \
    MultipleChoiceExam, GetMultipleChoiceTestSubmission

urlpatterns = [
    path('getCoursesAndTopics/', GetCoursesAndTopics.as_view(), name='get-courses-and-topics'),
    # path('createCourse/', ),
    # path('course/<int:id>'),
    # path('createTopic/', ),
    path('createPythonTest/', CreatePythonExam.as_view(), name='create-python-exam'),
    path('createMultipleChoiceExam/', CreateMultipleChoiceExam.as_view(), name='create-multiple-choice-exam'),
    path('multipleChoiceExam/<str:examName>/', MultipleChoiceExam.as_view(), name='get-multiple-choice-exam'),
    path('submissions/multipleChoiceExam/<int:submissionId>/', GetMultipleChoiceTestSubmission.as_view(),
         name='get-multiple-questions-test-submission')
]
