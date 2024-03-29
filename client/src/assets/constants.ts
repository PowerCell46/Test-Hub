import { Integration } from "./interfaces/main-interfaces";


export const baseServerUrl = `http://127.0.0.1:8000/`;


export const toastifyParams = {
    close: true,
    errorBackgroundColor: "linear-gradient(to right, #FF416C, #FF4B2B)",
    successBackgroundColor: "linear-gradient(to right, #16a06b, #009486, #00869a, #0076a0, #006398)"
}


export const projectIntegrations: Integration[] = [
    {
      title: "Faculty of Mathematics and Informatics", 
      description: `For the last two semesters I've had lectures and exercises at FMI,
        studying <b>Foundations of Programming, Databases and
        Object-Oriented-Programming</b>. <br> In one way or another I helped with the
        teaching process and completely undestand the need of such a platform,
        where students can exercise and get an instant feedback for their
        tasks.`, 
      imageUrl: "../../../../assets/images/FMI.PNG", 
      id: ""
    },
    {
      title: "SPGE John Atanasov", 
      description: `I've talked with a few teachers from the School that such a system can be of a great use if implemented successfully.
        <br> Again same as the case with FMI, teachers can create tasks that students can try to solve and get an instant result, which will definitely help with the learning process.`,
      imageUrl: "https://spge-bg.com/wp-content/uploads/2017/05/spge-1.jpg", 
      id: "SPGE-img"
    },
    {
      title: "Faculty of Geology and Geography", 
      description: `The project can be implemented mainly with the Multiple Choice Question Tests.
        <br> Teachers can add sample tests that students can use in order to prepare for the Examination session.`,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Sofia_University_%22St._Kliment_Ohridski%22_%2837849719131%29.jpg/1200px-Sofia_University_%22St._Kliment_Ohridski%22_%2837849719131%29.jpg',
      id: "GGF-img"
    }
]