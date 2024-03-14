import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeURLSegment, encodeURLSegment } from '../../../../../assets/utils';
import { MultipleChoiceTestService } from '../../../../services/multipleChoiceTest/multiple-choice-test.service';
import { MultipleChoiceTest } from '../../../../../assets/interfaces/main-interfaces';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { baseServerUrl, toastifyParams } from '../../../../../assets/constants';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
  selector: 'app-multiple-choice-test',
  templateUrl: './submit-multiple-choice-test.component.html',
  styleUrl: './submit-multiple-choice-test.component.css'
})
export class MultipleChoiceTestComponent implements OnInit {
  exam!: MultipleChoiceTest;
  taskName!: string;
  courseName: string = '';
  topicName: string = '';
  public testForm!: FormGroup; 
  formSubmitted = false; 
  
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private multipleChoiceTestService: MultipleChoiceTestService,
    public authService: AuthenticationService
  ) {}


  ngOnInit(): void {    
      this.route.params.subscribe(params => {
        this.courseName = params['courseName'];
        this.topicName = params['topicName'];
        this.taskName = decodeURLSegment(params['taskName']);
    
        this.multipleChoiceTestService.getMultipleChoiceTest(this.taskName).subscribe(data => {        
          data.topicTasks = data.topicTasks.map((task: any) => {
            return { ...task, encodedName: encodeURLSegment(task.name) };
          });

          // console.log(data);
          
          this.exam = data;
          this.initializeForm();
        });
    });
  }

  
  initializeForm() {
    const questionsControls = this.exam.questions.map(question => {
      return this.formBuilder.group({
        selectedValue: ['', Validators.required],
        questionId: [question.id, Validators.required]
      });
    });
  
    this.testForm = this.formBuilder.group({
      questions: this.formBuilder.array(questionsControls)
    });
  }
  

  get questionsFormArray() {
    return this.testForm.get('questions') as FormArray;
  }


  onMultipleQuestionsTestSubmit() {
    this.formSubmitted = true;

    if (this.testForm.valid) {
      const headers = new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      });
      
      this.http.post(`${baseServerUrl}testHub/multipleChoiceTest/${this.exam.title}/`, this.testForm.value, {headers: headers})
      .subscribe({
        next: (response: any) => {
          this.router.navigate([`submissions/multipleChoiceTest/${response.submissionId}`]);
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