from django.urls import path, include

from djangoServer.testhub_structure.views import GetCoursesAndTopics, \
    GetMultipleChoiceTestSubmission, GetAllPySubmissions, \
    MyProfile, GetAllMultipleChoiceSubmissions, CreateMultipleChoiceTest, CreatePythonTest, SubmitMultipleChoiceTest, \
    GetMultipleChoiceTestSingleQuestion, SubmitPythonTest

urlpatterns = [
    path('coursesTopicsTests/', GetCoursesAndTopics.as_view(), name='courses-topics-tests'),

    # path('createCourse/', ),
    # path('createTopic/', ),
    path('createMultipleChoiceTest/', CreateMultipleChoiceTest.as_view(), name='create-multiple-choice-test'),
    path('createPythonTest/', CreatePythonTest.as_view(), name='create-python-test'),

    path('multipleChoiceTest/<str:exam_name>/', SubmitMultipleChoiceTest.as_view(), name='submit-multiple-choice-test'),

    path('submissions/', include([
        path('multipleChoiceTest/<int:submission_id>/', GetMultipleChoiceTestSubmission.as_view(),
             name='get-multiple-choice-test-submission'),
        path('multipleChoiceTest/<int:submission_id>/<int:question_id>/', GetMultipleChoiceTestSingleQuestion.as_view(),
         name='get-multiple-choice-test-single-question'),

        path('python/', GetAllPySubmissions.as_view(), name='all-python-submissions'),
        path('multipleChoice/', GetAllMultipleChoiceSubmissions.as_view(), name='all-mcq-submissions')
    ])),

    path('pythonTest/<str:name>/', SubmitPythonTest.as_view(), name='submit-python-test'),
    path('myProfile/', MyProfile.as_view(), name='my-profile'),  # Move to auth
]
