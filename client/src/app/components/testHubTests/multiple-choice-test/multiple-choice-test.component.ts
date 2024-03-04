import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { decodeURLSegment } from '../../../../assets/utils';
import { MultipleChoiceExamService } from '../../../services/multiple-choice-exam.service';
import { MultipleChoiceExam } from '../../../../assets/interfaces/main-interfaces';

@Component({
  selector: 'app-multiple-choice-test',
  templateUrl: './multiple-choice-test.component.html',
  styleUrl: './multiple-choice-test.component.css'
})
export class MultipleChoiceTestComponent implements OnInit {
  exam!: MultipleChoiceExam;
  taskName!: string;
  
  constructor(private route: ActivatedRoute, private multipleChoiceExamService: MultipleChoiceExamService) { }

  ngOnInit(): void {    
    this.route.params.subscribe(params => {
      this.taskName = decodeURLSegment(params['taskName']);

      this.multipleChoiceExamService.getMultipleChoiceExam(this.taskName).subscribe(data => {
        this.exam = data;
      });
      
    });
  }
}