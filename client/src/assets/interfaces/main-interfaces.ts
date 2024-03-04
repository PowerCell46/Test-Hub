export interface QuestionInitForm {
    id: number,
    title: string
} 

// export interface RegisterUser {
//     username: string,
//     email: string,
//     image: null 
// }

// export interface RegisterResponse {
//     user: RegisterUser,
//     token: string
// }

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

export interface MultipleChoiceExam {
    title: string,
    questions: multipleChoiceQuestion[]
}