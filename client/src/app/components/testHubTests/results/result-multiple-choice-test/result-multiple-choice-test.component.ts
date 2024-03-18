import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultipleChoiceTestService } from '../../../../services/multipleChoiceTest/multiple-choice-test.service';

@Component({
  selector: 'app-result-multiple-choice-test',
  templateUrl: './result-multiple-choice-test.component.html',
  styleUrls: ['./result-multiple-choice-test.component.css', './result-multiple-choice-test.component.media-queries.css']
})
export class ResultMultipleChoiceTestComponent implements OnInit{
  submissionId!: number;
  submission: any;
  constructor(
    private route: ActivatedRoute,
    private multipleChoiceTestService: MultipleChoiceTestService
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.submissionId = params['submissionId'];

      this.multipleChoiceTestService.getMultipleChoiceSubmission(this.submissionId).subscribe(data => {
        // console.log(data);
        this.submission = data;
      });
    });
  }
}
