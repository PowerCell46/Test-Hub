import io
import sys
import unittest


def run_tests(code, test_code):
    old_stdout = sys.stdout
    sys.stdout = new_stdout = io.StringIO()

    namespace = {}
    try:
        exec(code, namespace)
        exec(test_code, namespace)

        suite = unittest.TestSuite()
        for obj in namespace.values():
            if isinstance(obj, type) and issubclass(obj, unittest.TestCase):
                suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(obj))

        result = unittest.TextTestRunner().run(suite)
        score = result.testsRun - len(result.failures) - len(result.errors)

        return {
            'score': score,
            'output': new_stdout.getvalue(),
            'errors': result.errors,
            'failures': result.failures
        }
    except Exception as e:
        return {
            'score': 0,
            'output': f'Error in executing code or tests: {e}',
            'errors': [(str(e), '')],
            'failures': []
        }
    finally:
        sys.stdout = old_stdout


def get_all_topic_tasks(task) -> []:
    topic_tasks = []

    for task in task.topic.multiple_choice_tests.all():
        topic_tasks.append({"type": "multiple-choice", "name": task.title})

    for task in task.topic.py_tests.all():
        topic_tasks.append({"type": "python", "name": task.title})

    return topic_tasks
