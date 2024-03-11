from django.urls import path

from djangoServer.testhub_structure.views import GetCoursesAndTopics, \
    GetMultipleChoiceTestSubmission, GetMultipleChoiceQuestion, PythonTest, GetAllPySubmissions, \
    MyProfile, GetAllMultipleChoiceSubmissions, CreateMultipleChoiceTest, CreatePythonTest, SubmitMultipleChoiceTest

urlpatterns = [
    path('coursesTopicsTests/', GetCoursesAndTopics.as_view(), name='courses-topics-tests'),

    # path('createCourse/', ),
    # path('createTopic/', ),
    path('createMultipleChoiceTest/', CreateMultipleChoiceTest.as_view(), name='create-multiple-choice-test'),
    path('createPythonTest/', CreatePythonTest.as_view(), name='create-python-test'),

    path('multipleChoiceTest/<str:exam_name>/', SubmitMultipleChoiceTest.as_view(), name='submit-multiple-choice-test'),



    path('submissions/multipleChoiceExam/<int:submissionId>/', GetMultipleChoiceTestSubmission.as_view(),
         name='get-multiple-questions-test-submission'),
    path('submissions/multipleChoiceExam/<int:submissionId>/<int:questionId>/', GetMultipleChoiceQuestion.as_view(),
         name='get-multiple-choice-question'),
    path('pythonTest/<str:name>/', PythonTest.as_view(), name='python-test'),
    path('submissions/python/', GetAllPySubmissions.as_view(), name='all-py-submissions'),
    path('submissions/multipleChoice/', GetAllMultipleChoiceSubmissions.as_view(), name='all-mcq-submissions'),
    path('myProfile/', MyProfile.as_view(), name='my-profile'),  # Move to auth
]
