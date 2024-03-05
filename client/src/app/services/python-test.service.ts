import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseServerUrl } from '../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class PythonTestService {

  constructor(private http: HttpClient) { }

  getPythonTestData(pythonTest: string) {
    return this.http.get<any[]>(`${baseServerUrl}testHub/pythonTest/${pythonTest}/`).pipe();
  }
}
