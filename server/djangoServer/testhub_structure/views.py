from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from djangoServer.testhub_structure.models import Course
from djangoServer.testhub_structure.permissions import IsTeacher
from djangoServer.testhub_structure.serializers import CourseSerializer


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
