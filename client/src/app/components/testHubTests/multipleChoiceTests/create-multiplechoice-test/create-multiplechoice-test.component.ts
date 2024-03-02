import { Component } from '@angular/core';
import { QuestionInitForm } from '../../../../../assets/interfaces/main-interfaces';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-multiplechoice-test',
  templateUrl: './create-multiplechoice-test.component.html',
  styleUrl: './create-multiplechoice-test.component.css'
})
export class CreateMultiplechoiceTestComponent {
    public multipleQuestionsExamForm: FormGroup;
    questions:QuestionInitForm[] = [
        {id: 1, title: "What is the difference between list and tuple?"},
        {id: 2, title: "How do delete files in Python?"},
        {id: 3, title: "Explain scope in Python."}
    ]

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public authService: AuthenticationService) {
      this.multipleQuestionsExamForm = this.formBuilder.group({
        examTitle: ['', [Validators.required]],
        course: ['', [Validators.required]],
        topic: ['', [Validators.required]],
        examQuestions: this.formBuilder.array([])
      });
    }

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

    onMultipleQuestionsSubmit() {
      console.log(this.multipleQuestionsExamForm.value);
      
    }
}