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

interface HomePageTask {
    title: string
}

interface HomePageTopics {
    title: string,
    tasks: HomePageTask[] 
}

export interface HomePageCourse {
    title: string,
    topics: HomePageTopics[]
}