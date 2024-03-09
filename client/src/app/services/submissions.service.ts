import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseServerUrl } from '../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {

  constructor(private http: HttpClient) { }

  getAllPySubmissions() {
    return this.http.get<any[]>(`${baseServerUrl}testHub/submissions/python/`).pipe();
  }

  getAllMCQSubmissions() {
    return this.http.get<any[]>(`${baseServerUrl}testHub/submissions/multipleChoice/`).pipe();
  }
}
