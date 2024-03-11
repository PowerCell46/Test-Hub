import { Component, OnInit } from '@angular/core';
import { SubmissionsService } from '../../../services/submissions/submissions.service';

@Component({
  selector: 'app-submissions-multiple-choice-tests',
  templateUrl: './submissions-multiple-choice-tests.component.html',
  styleUrl: './submissions-multiple-choice-tests.component.css'
})
export class SubmissionsMultipleChoiceTestsComponent implements OnInit {
  submissions: any[] = []; 

  constructor(
    private submissionsService: SubmissionsService
  ) {}


  ngOnInit(): void {
    this.submissionsService.getAllMCQSubmissions().subscribe(data => {
      this.submissions = data;      
    });
  }

  
  getArray(num: number): any[] {
    return new Array(num);
  }
}
