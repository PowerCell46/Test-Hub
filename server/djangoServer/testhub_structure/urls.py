from django.urls import path

from djangoServer.testhub_structure.views import GetCoursesAndTopics

urlpatterns = [
    path('getCoursesAndTopics/', GetCoursesAndTopics.as_view(), name='get-courses-and-topics')
    # path('createCourse/', ),
    # path('course/<int:id>'),
    # path('createTopic/', ),
    # path('createPyTest/', ),
    # path('createMultipleChoiceTest/', ),
    # path('createMultipleChoiceQuestion', ),
]
