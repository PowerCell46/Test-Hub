import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultipleChoiceTestService } from '../../../../services/multipleChoiceTest/multiple-choice-test.service';

@Component({
  selector: 'app-result-single-question',
  templateUrl: './result-single-question.component.html',
  styleUrl: './result-single-question.component.css'
})
export class ResultSingleQuestionComponent implements OnInit{
  submissionId!: number;
  questionId!: number;
  question!: any;

  constructor(private route: ActivatedRoute, private multipleChoiceTestService: MultipleChoiceTestService) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.submissionId = params['submissionId'];
        this.questionId = params['questionId'];
      
        this.multipleChoiceTestService.getSingleQuestion(this.submissionId, this.questionId).subscribe(data => {
          console.log(data);
          
          this.question = data;
        });
    });
    }
}
