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

interface PyTests {
    id: number,
    title: string,
    visible: boolean,
    encoded: string
}

interface MultipleChoiceTests {
    id: number,
    title: string,
    visible: boolean,
    encoded: string
}

interface Topics {
    id: number,
    name: string,
    visible: boolean,
    multiple_choice_tests: MultipleChoiceTests[],
    py_tests: PyTests[], 
    encoded: string
}

export interface Courses {
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