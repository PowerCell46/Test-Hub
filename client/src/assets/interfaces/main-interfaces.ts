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
    visible: boolean
}

interface MultipleChoiceTests {
    id: number,
    title: string,
    visible: boolean
}

interface Topics {
    id: number,
    name: string,
    visible: boolean,
    multiple_choice_tests: MultipleChoiceTests[],
    py_tests: PyTests[], 
}

export interface Courses {
    id: number,
    name: string,
    topics: Topics[],
    visible: boolean
}

export interface Submissions {
    submissionN: number,
    user: string,
    task: string,
    result: string
}