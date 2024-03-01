import { Component } from '@angular/core';
import { QuestionInitForm } from '../../assets/interfaces/main-interfaces';

@Component({
  selector: 'app-create-multiplechoice-test',
  templateUrl: './create-multiplechoice-test.component.html',
  styleUrl: './create-multiplechoice-test.component.css'
})
export class CreateMultiplechoiceTestComponent {

    questions:QuestionInitForm[] = [
        {id: 1, title: "What is the difference between list and tuple?"},
        {id: 2, title: "How do delete files in Python?"},
        {id: 3, title: "Explain scope in Python."}
    ]

  removeQuestion(questionId: number): void {
    this.questions = this.questions.filter(question => question.id != questionId);
  }

  createQuestion(): void {
    let newId = 1;

    if (this.questions.length > 0) {
    newId = this.questions.sort((a, b) => b.id - a.id)[0].id + 1;
    }

    this.questions.sort((a, b) => a.id - b.id);

    this.questions.push({id:newId, title: "What is Python?" });
    }   
}
