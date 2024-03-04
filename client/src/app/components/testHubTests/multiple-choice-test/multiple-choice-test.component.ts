import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { decodeURLSegment } from '../../../../assets/utils';
import { MultipleChoiceExamService } from '../../../services/multiple-choice-exam.service';
import { MultipleChoiceExam } from '../../../../assets/interfaces/main-interfaces';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-multiple-choice-test',
  templateUrl: './multiple-choice-test.component.html',
  styleUrl: './multiple-choice-test.component.css'
})
export class MultipleChoiceTestComponent implements OnInit {
  exam!: MultipleChoiceExam;
  taskName!: string;
  public examForm!: FormGroup; 
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private multipleChoiceExamService: MultipleChoiceExamService) {}

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
        selectedValue: ['', Validators.required]
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
    console.log(this.examForm.value);
  }
}