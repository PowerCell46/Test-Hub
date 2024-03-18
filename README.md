<!-- # Test-Hub
A repository containing my currently developed project, written in Django and Angular.

### Initialize Angular Project: 
- ng new client --no-standalone --routing --ssr=false
- resourse: https://github.com/angular/angular/issues/52751
 -->
# TestHub Documentation

## Introduction:

TestHub is an online system designed to facilitate test creation, management, and participation for educational purposes. It allows teachers to create two types of tests - multiple-choice tests and Python tests. The system is organized into courses, with each course containing various topics. Within each topic, different tests can be assigned. Students can attempt these tests and receive instant feedback on their performance.

## Features:

- **Test Creation:** Teachers can create multiple-choice tests and Python tests.
- **Course Management:** Courses are organized into topics, allowing for structured learning.
- **Instant Results:** Students receive immediate feedback on their test attempts.
- **User Profiles:** Each user has a personalized profile page displaying personal information and statistics related to their account.

## Technologies Used:

- **Backend:** Django Rest Framework
- **Frontend:** Angular
- **Database:** PostgreSQL
- **Frontend Styling:** Custom HTML and CSS

## Setup Instructions:

1. **Prerequisites:**
   - Ensure you have Node.js and npm installed for Angular.
   - Install Python and Django for the backend.
   - Set up a PostgreSQL database.

2. **Installation:**
   - Clone the repository.
   - Navigate to the frontend and backend directories and install dependencies.
   - Configure the backend settings, including database connections.

3. **Running the Application:**
   - Start the Django server for the backend.
   - Run the Angular application for the frontend.

## Directory Structure:

- **frontend:** Contains Angular frontend files.
- **backend:** Contains Django backend files.
- **database:** Database migrations and configurations.

## Usage:

1. **Test Creation:**
   - Teachers can log in and create new tests under the desired course and topic.

2. **Test Participation:**
   - Students can log in and attempt tests available under their enrolled courses and topics.

3. **Profile Page:**
   - Users can view their personal information and statistics, including total stats and stats for each course participated in.

## API Documentation:

- Detailed API documentation is available for interacting with the backend services.

## Deployment:

- Instructions for deploying the application to production servers.

## Testing:

- Guidelines for testing both frontend and backend components.

## Contributing:

- Guidelines for contributing to the project, including setting up a development environment and submitting pull requests.

## Additional Resources:

- Links to relevant documentation for Angular, Django, PostgreSQL, and other technologies used in the project.
