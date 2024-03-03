import { Component } from '@angular/core';
import { Submissions } from '../../../../assets/interfaces/main-interfaces';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css'
})
export class SubmissionsComponent {
  submissions: Submissions[] = [
    {submissionN: 10, user: "PowerCell46", task: "Sum even numbers", result: "80/100"},
    {submissionN: 9, user: "Kristian8", task: "Sum odd numbers", result: "100/100"},
    {submissionN: 8, user: "PowerCell46", task: "Warships", result: "70/100"},
    {submissionN: 7, user: "Stiliyan26", task: "Sum odd numbers", result: "90/100"},
    {submissionN: 6, user: "PowerCell46", task: "Sum even numbers", result: "80/100"},
    {submissionN: 5, user: "Stiliyan26", task: "Destroyer", result: "80/100"},
    {submissionN: 4, user: "Kaloyan12", task: "Kate's way out", result: "80/100"},
    {submissionN: 3, user: "Kristian8", task: "Greystone", result: "100/100"},
    {submissionN: 2, user: "Gumbal4e", task: "Random Name", result: "30/100"},
    {submissionN: 1, user: "Ivan", task: "Sum even numbers", result: "60/100"},
  ]
}
