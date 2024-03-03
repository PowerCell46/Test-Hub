import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-create-multiplechoice-test',
  templateUrl: './create-multiplechoice-test.component.html',
  styleUrls: ['./create-multiplechoice-test.component.css']
})
export class CreateMultiplechoiceTestComponent {
    public multipleQuestionsExamForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public authService: AuthenticationService) {
      this.multipleQuestionsExamForm = this.formBuilder.group({
        examTitle: ['', [Validators.required, Validators.minLength(3)]],
        course: ['', [Validators.required]],
        topic: ['', [Validators.required]],
        examQuestions: this.formBuilder.array([])
      });

    }

    get examQuestions(): FormArray {
      return this.multipleQuestionsExamForm.get('examQuestions') as FormArray;
    }


    private createQuestionFormGroup(newId: number): FormGroup {
      return this.formBuilder.group({
        id: [newId],
        title: ['', [Validators.required, Validators.minLength(5)]],
        optionA: ['', [Validators.required, Validators.minLength(1)]],
        optionB: ['', [Validators.required, Validators.minLength(1)]],
        optionC: ['', [Validators.required, Validators.minLength(1)]],
        optionD: ['', [Validators.required, Validators.minLength(1)]],
        correctAnswer: ['', [Validators.required, Validators.min(1), Validators.max(4)]]
      });
    }

    addQuestion(): void {
      const newId = this.examQuestions.value.length + 1; 
      this.examQuestions.push(this.createQuestionFormGroup(newId));
    }

    removeQuestion(index: number): void {
      this.examQuestions.removeAt(index);
    }

    onMultipleQuestionsSubmit(): void {
      console.log(this.multipleQuestionsExamForm.value);
      // Submit your form here. Remember to handle the form's `examQuestions` array on your backend accordingly.
    }
}
