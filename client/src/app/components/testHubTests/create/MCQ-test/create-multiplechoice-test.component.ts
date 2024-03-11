import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { CoursesTopicsTestsService } from '../../../../services/coursesTopicsTests/courses-topics-tests.service';
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
    public multipleQuestionsTestForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router,
      public authService: AuthenticationService,
      private courseTopicsTestsService: CoursesTopicsTestsService
    ) {
      this.multipleQuestionsTestForm = this.formBuilder.group({
        testTitle: ['', [Validators.required, Validators.minLength(3)]],
        course: ['', [Validators.required]],
        topic: [{value: null, disabled: true}, [Validators.required, topicDefaultValueValidator()]],
        testQuestions: this.formBuilder.array([])
      });
    }


    ngOnInit(): void {
      this.courseTopicsTestsService.getCourses().subscribe((data: string[]) => {
        // console.log(data);
        this.courses = data;
      });
    }


    onCourseSelect(): void {
      const selectedCourse = this.multipleQuestionsTestForm.get('course')?.value;
      if (selectedCourse) {
        this.courseTopicsTestsService.getTopics(selectedCourse).subscribe((topics: string[]) => {  
          // console.log(topics);                
          this.topics = topics;
          this.multipleQuestionsTestForm.get('topic')?.enable();
          this.multipleQuestionsTestForm.get('topic')?.setValue('Select a Topic');
        });
      }
    }


    get testQuestions(): FormArray {
      return this.multipleQuestionsTestForm.get('testQuestions') as FormArray;
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
      const newId = this.testQuestions.value.length + 1; 
      this.testQuestions.push(this.createQuestionFormGroup(newId));
    }


    removeQuestion(index: number): void {
      this.testQuestions.removeAt(index);
    }

    
    onMultipleQuestionsSubmit(): void {
      if (this.multipleQuestionsTestForm.valid) {
        const headers = new HttpHeaders({
          'Authorization': `Token ${this.authService.getToken()}`
        });
  
        this.http.post(`${baseServerUrl}testHub/createMultipleChoiceTest/`, this.multipleQuestionsTestForm.value, {headers: headers})
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
