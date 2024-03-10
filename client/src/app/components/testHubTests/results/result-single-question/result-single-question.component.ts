import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultipleChoiceExamService } from '../../../../services/multiple-choice-exam.service';

@Component({
  selector: 'app-result-single-question',
  templateUrl: './result-single-question.component.html',
  styleUrl: './result-single-question.component.css'
})
export class ResultSingleQuestionComponent implements OnInit{
  submissionId!: number;
  questionId!: number;
  question!: any;

  constructor(private route: ActivatedRoute, private multipleChoiceExamService: MultipleChoiceExamService) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.submissionId = params['submissionId'];
        this.questionId = params['questionId'];
      
        this.multipleChoiceExamService.getSingleQuestion(this.submissionId, this.questionId).subscribe(data => {
          console.log(data);
          
          this.question = data;
        });
    });
    }
}
