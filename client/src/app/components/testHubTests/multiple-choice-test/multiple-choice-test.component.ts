import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeURLSegment } from '../../../../assets/utils';
import { MultipleChoiceExamService } from '../../../services/multiple-choice-exam.service';
import { MultipleChoiceExam } from '../../../../assets/interfaces/main-interfaces';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { baseServerUrl } from '../../../../assets/constants';

@Component({
  selector: 'app-multiple-choice-test',
  templateUrl: './multiple-choice-test.component.html',
  styleUrl: './multiple-choice-test.component.css'
})
export class MultipleChoiceTestComponent implements OnInit {
  exam!: MultipleChoiceExam;
  taskName!: string;
  public examForm!: FormGroup; 
  
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient,  private route: ActivatedRoute, private multipleChoiceExamService: MultipleChoiceExamService, public authService: AuthenticationService) {}

  ngOnInit(): void {    
    this.route.params.subscribe(params => {
      this.taskName = decodeURLSegment(params['taskName']);
  
      this.multipleChoiceExamService.getMultipleChoiceExam(this.taskName).subscribe(data => {        
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
  
    this.examForm = this.formBuilder.group({
      questions: this.formBuilder.array(questionsControls)
    });
  }
  

  get questionsFormArray() {
    return this.examForm.get('questions') as FormArray;
  }

  onMultipleQuestionsExamSubmit() {

    if (this.examForm.valid) {
      const headers = new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      });
      this.http.post(`${baseServerUrl}testHub/multipleChoiceExam/${this.exam.title}/`, this.examForm.value, {headers: headers})
      .subscribe({
        next: (response: any) => {
          this.router.navigate([`submissions/multipleChoiceTest/${response.submissionId}`]);
        },
        error: (err) => {
          console.error(err);
        }
      })     
    }
  }
}