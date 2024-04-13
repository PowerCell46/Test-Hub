from django.contrib import admin
from djangoServer.testhub_structure.models import Topic, Course, PyTest, MultipleChoiceTest


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['name', 'creator']
    search_fields = ['name']


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ['name', 'course', 'creator']
    search_fields = ['name']


@admin.register(PyTest)
class PyTestAdmin(admin.ModelAdmin):
    list_display = ['title', 'topic', 'creator']
    search_fields = ['title']


@admin.register(MultipleChoiceTest)
class MultipleChoiceTestAdmin(admin.ModelAdmin):
    list_display = ['title', 'topic', 'creator']
    search_fields = ['title']

