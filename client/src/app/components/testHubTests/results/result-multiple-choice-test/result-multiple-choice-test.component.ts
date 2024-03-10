import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultipleChoiceExamService } from '../../../../services/multiple-choice-exam.service';

@Component({
  selector: 'app-result-multiple-choice-test',
  templateUrl: './result-multiple-choice-test.component.html',
  styleUrl: './result-multiple-choice-test.component.css'
})
export class ResultMultipleChoiceTestComponent implements OnInit{
  submissionId!: number;
  submission: any;
  constructor(private route: ActivatedRoute, private multipleChoiceExamService: MultipleChoiceExamService) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.submissionId = params['submissionId'];

      this.multipleChoiceExamService.getMultipleChoiceSubmission(this.submissionId).subscribe(data => {
        // console.log(data);
        this.submission = data;
      })
    })
  }
}
