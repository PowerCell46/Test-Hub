import { Component, OnInit } from '@angular/core';
import { SubmissionsService } from '../../../services/submissions/submissions.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions-python-test.component.html',
  styleUrl: './submissions-python-test.component.css'
})
export class SubmissionsComponent implements OnInit{
  submissions: any[] = []; 

  constructor(
    private submissionsService: SubmissionsService
  ) {}

  
  ngOnInit(): void {
    this.submissionsService.getAllPySubmissions().subscribe(data => {
      this.submissions = data;
    })
  }


  getArray(num: number): any[] {
    return new Array(num);
  }
}
