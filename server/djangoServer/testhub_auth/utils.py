from django.db import transaction

from djangoServer.testhub_auth.models import UserProfile


def calculate_average_grade(test_type: str, submissions) -> str:
    total_correct_points = {}
    total_total_points = {}

    for submission in submissions:
        if test_type == 'Python':
            submission_title = submission.python_test.title
            submission_correct_points = submission.num_correct_tests
            test_total_points = submission.num_total_tests
        else:
            submission_title = submission.multiple_choice_exam.title
            submission_correct_points = submission.correct_answers
            test_total_points = submission.multiple_choice_exam.questions.count()

        if submission_title not in total_correct_points.keys():
            total_correct_points[submission_title] = submission_correct_points
            total_total_points[submission_title] = test_total_points

        if submission_correct_points > total_correct_points[submission_title]:
            total_correct_points[submission_title] = submission_correct_points

    # print(total_correct_points)
    # print(total_total_points)

    if len(total_correct_points) > 0:
        avg_correct_points = sum(total_correct_points.values()) / len(total_correct_points)
    else:
        avg_correct_points = 0.0

    if len(total_total_points) > 0:
        avg_total_points = sum(total_total_points.values()) / len(total_total_points)
    else:
        avg_total_points = 0.0

    return f'{avg_correct_points:.2f}/{avg_total_points:.2f}'


@transaction.atomic
def update_user_details(first_name, last_name, gender, telephone, nationality, profile_picture,
                        user_profile: UserProfile, user) -> None:
    if first_name != user.first_name and first_name != '':
        user.first_name = first_name
    if last_name != user.last_name and last_name != '':
        user.last_name = last_name
    if gender != user_profile.gender and gender != '':
        user_profile.gender = gender
    if telephone != user_profile.phone_number and telephone != '':
        user_profile.phone_number = telephone
    if nationality != user_profile.nationality and nationality != '':
        user_profile.nationality = nationality
    if profile_picture != user_profile.image and profile_picture is not None:
        user_profile.image = profile_picture

    user.save()
    user_profile.save()
