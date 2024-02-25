from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from djangoServer.testhub_structure.permissions import IsTeacher


class CreateTopic(APIView):
    permission_classes = [IsTeacher]

    def post(self, request):

        return Response({'message': "Only teacher can see this."})
