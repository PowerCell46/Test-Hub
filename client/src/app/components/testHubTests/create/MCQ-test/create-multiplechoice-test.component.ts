import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { CoursesTopicsService } from '../../../../services/courses-topics.service';
import { topicDefaultValueValidator } from '../../../../../assets/validators/topicValidator';
import { baseServerUrl, toastifyParams } from '../../../../../assets/constants';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
  selector: 'app-create-multiplechoice-test',
  templateUrl: './create-multiplechoice-test.component.html',
  styleUrls: ['./create-multiplechoice-test.component.css']
})
export class CreateMultiplechoiceTestComponent implements OnInit{
    courses: any = [];
    topics: any = [];
    public multipleQuestionsExamForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router,
      public authService: AuthenticationService,
      private courseTopicsService: CoursesTopicsService
    ) {
      this.multipleQuestionsExamForm = this.formBuilder.group({
        examTitle: ['', [Validators.required, Validators.minLength(3)]],
        course: ['', [Validators.required]],
        topic: [{value: null, disabled: true}, [Validators.required, topicDefaultValueValidator()]],
        examQuestions: this.formBuilder.array([])
      });
    }


    ngOnInit(): void {
      this.courseTopicsService.getCourses().subscribe((data: string[]) => {
        // console.log(data);
        this.courses = data;
      });
    }


    onCourseSelect(): void {
      const selectedCourse = this.multipleQuestionsExamForm.get('course')?.value;
      if (selectedCourse) {
        this.courseTopicsService.getTopics(selectedCourse).subscribe((topics: string[]) => {  
          // console.log(topics);                
          this.topics = topics;
          this.multipleQuestionsExamForm.get('topic')?.enable();
          this.multipleQuestionsExamForm.get('topic')?.setValue('Select a Topic');
        });
      }
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
      if (this.multipleQuestionsExamForm.valid) {
        const headers = new HttpHeaders({
          'Authorization': `Token ${this.authService.getToken()}`
        });
  
        this.http.post(`${baseServerUrl}testHub/createMultipleChoiceExam/`, this.multipleQuestionsExamForm.value, {headers: headers})
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: err => {
            console.error(err);
            Toastify({
              text: "MCQ Submission error: Please try again later.",
              duration: 3000,
              close: toastifyParams.close,
              gravity: "top",
              position: "center",
              backgroundColor: toastifyParams.errorBackgroundColor,
            }).showToast();
          }
        });
      
      } else {
        Toastify({
          text: "Please fill in all required fields correctly.",
          duration: 3000,
          close: toastifyParams.close,
          gravity: "top",
          position: "center",
          backgroundColor: toastifyParams.errorBackgroundColor,
        }).showToast();
      }   
    }
}
