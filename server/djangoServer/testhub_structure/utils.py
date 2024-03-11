import io
import re
import sys
import unittest

# does not work !!!
def count_test_methods(test_code):
    test_method_pattern = r'\bdef test[A-Za-z0-9_]*\b'
    sys.__stdout__.write(test_code + '\n')  # This will print to the console
    matches = re.findall(test_method_pattern, test_code)
    sys.__stdout__.write(str(matches) + '\n')  # This will also print to the console
    return len(matches)


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
            'number_of_tests': count_test_methods(test_code),
            'score': score,
            'output': new_stdout.getvalue(),
            'errors': result.errors,
            'failures': result.failures
        }
    except Exception as e:
        return {
            'number_of_tests': count_test_methods(test_code),
            'score': 0,
            'output': f'Error in executing code or tests: {e}',
            'errors': [(str(e), '')],
            'failures': []
        }
    finally:
        sys.stdout = old_stdout
