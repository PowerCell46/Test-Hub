import { Injectable } from '@angular/core';
import { baseServerUrl } from '../../../assets/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MultipleChoiceTestService {
  requestUrl = `${baseServerUrl}testHub/multipleChoiceTest/`;
  
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getMultipleChoiceTest(examName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });

    return this.http.get<any[]>(`${this.requestUrl}${examName}/`, {headers: headers}).pipe();
  }

  getMultipleChoiceSubmission(submissionId: number): Observable<any> {
    return this.http.get<any[]>(`${baseServerUrl}testHub/submissions/multipleChoiceExam/${submissionId}/`).pipe();
  }

  getSingleQuestion(submissionId: number, questionId: number): Observable<any> {
    return this.http.get<any[]>(`${baseServerUrl}testHub/submissions/multipleChoiceExam/${submissionId}/${questionId}/`).pipe();
  }
}
