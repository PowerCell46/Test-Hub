export interface User {
    email: string,
    username: string,
    first_name: string,
    last_name: string,
}


export interface SuccessfulAuth {
    token: string,
    user: User
}


export interface QuestionInitForm {
    id: number,
    title: string
} 


interface PyTests { // For Home Page
    id: number,
    title: string,
    visible: boolean,
    encoded: string
}


interface MultipleChoiceTests { // For Home Page
    id: number,
    title: string,
    visible: boolean,
    encoded: string
}


interface Topics { // For Home Page
    id: number,
    name: string,
    visible: boolean,
    multiple_choice_tests: MultipleChoiceTests[],
    py_tests: PyTests[], 
    encoded: string
}


export interface Courses { // For Home Page
    id: number,
    name: string,
    topics: Topics[],
    visible: boolean,
    encoded: string
}


export interface Submissions {
    submissionN: number,
    user: string,
    task: string,
    result: string
}


interface multipleChoiceQuestion {
    id: number,
    correct_answer: number,
    first_option: string,
    second_option: string,
    third_option: string,
    fourth_option: string,
    question_title: string,
} 


interface Task {
    name: string,
    type: string,
    encodedName: string
}


export interface MultipleChoiceTest {
    title: string,
    questions: multipleChoiceQuestion[],
    topicTasks: Task[]
}


export interface Integration {
    title: string,
    description: string,
    imageUrl: string,
    id: string
}