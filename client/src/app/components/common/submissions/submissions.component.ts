import { Component, OnInit } from '@angular/core';
import { Submissions } from '../../../../assets/interfaces/main-interfaces';
import { HttpClient } from '@angular/common/http';
import { SubmissionsService } from '../../../services/submissions.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css'
})
export class SubmissionsComponent implements OnInit{
  submissions: any[] = []; 

  constructor(private submissionsService: SubmissionsService) {}

  ngOnInit(): void {
    this.submissionsService.getAllSubmissions().subscribe(data => {
      this.submissions = data;
    })
  }

  getArray(num: number): any[] {
    return new Array(num);
  }

}
