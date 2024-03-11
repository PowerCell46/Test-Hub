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


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
  }


  getMultipleChoiceTest(examName: string): Observable<any> {
    return this.http.get<any[]>(`${this.requestUrl}${examName}/`, {headers: this.getHeaders() }).pipe();
  }


  getMultipleChoiceSubmission(submissionId: number): Observable<any> {
    return this.http.get<any[]>(`${baseServerUrl}testHub/submissions/multipleChoiceTest/${submissionId}/`, {headers: this.getHeaders() }).pipe();
  }


  getSingleQuestion(submissionId: number, questionId: number): Observable<any> {
    return this.http.get<any[]>(`${baseServerUrl}testHub/submissions/multipleChoiceTest/${submissionId}/${questionId}/`, {headers: this.getHeaders() }).pipe();
  }
}
