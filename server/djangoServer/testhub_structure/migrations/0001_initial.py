# Generated by Django 5.0.2 on 2024-02-25 10:51

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, validators=[django.core.validators.MinLengthValidator(3)])),
                ('description', models.TextField(blank=True, null=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='courses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MultipleChoiceTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=25, validators=[django.core.validators.MinLengthValidator(3)])),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='multiple_choice_tests', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MultipleChoiceQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_title', models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(5)])),
                ('first_option', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(1)])),
                ('second_option', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(1)])),
                ('third_option', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(1)])),
                ('fourth_option', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(1)])),
                ('correct_answer', models.PositiveIntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4)])),
                ('test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='testhub_structure.multiplechoicetest')),
            ],
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, validators=[django.core.validators.MinLengthValidator(3)])),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='topics', to='testhub_structure.course')),
            ],
        ),
        migrations.CreateModel(
            name='PyTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=25, validators=[django.core.validators.MinLengthValidator(3)])),
                ('description', models.FileField(upload_to='py_tests_descriptions/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docs'])])),
                ('unit_tests', models.TextField()),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='py_tests', to=settings.AUTH_USER_MODEL)),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='py_tests', to='testhub_structure.topic')),
            ],
        ),
        migrations.AddField(
            model_name='multiplechoicetest',
            name='topic',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='multiple_choice_tests', to='testhub_structure.topic'),
        ),
    ]
