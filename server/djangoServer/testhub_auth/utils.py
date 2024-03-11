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
