import { Injectable } from '@angular/core';
import { baseServerUrl } from '../../assets/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleChoiceExamService {
  requestUrl = `${baseServerUrl}testHub/multipleChoiceExam/`;
  constructor(private http: HttpClient) { }

  getMultipleChoiceExam(examName: string): Observable<any> {
    return this.http.get<any[]>(`${this.requestUrl}${examName}/`).pipe();
  }
}
