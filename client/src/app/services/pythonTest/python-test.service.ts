import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseServerUrl } from '../../../assets/constants';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PythonTestService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getPythonTestData(pythonTest: string) {
    return this.http.get<any[]>(`${baseServerUrl}testHub/pythonTest/${pythonTest}/`, {headers: this.authService.getHeaders()}).pipe();
  }
}
