import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseServerUrl } from '../../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {
  requestUrl: string = `${baseServerUrl}testHub/submissions/`
 
  constructor(
    private http: HttpClient
  ) { }


  getAllPySubmissions() {
    return this.http.get<any[]>(`${this.requestUrl}python/`).pipe();
  }
  

  getAllMCQSubmissions() {
    return this.http.get<any[]>(`${this.requestUrl}multipleChoice/`).pipe();
  }
}
