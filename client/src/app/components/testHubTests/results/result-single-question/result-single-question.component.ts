import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultipleChoiceTestService } from '../../../../services/multipleChoiceTest/multiple-choice-test.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-result-single-question',
  templateUrl: './result-single-question.component.html',
  styleUrls: ['./result-single-question.component.css', './result-single-question.component.media-queries.css']
})
export class ResultSingleQuestionComponent implements OnInit{
  submissionId!: number;
  questionId!: number;
  question!: any;

  
  constructor(
    private route: ActivatedRoute,
    private multipleChoiceTestService: MultipleChoiceTestService,
    private location: Location
  ) {}


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


  goBack(): void {
    this.location.back();
  }
}
