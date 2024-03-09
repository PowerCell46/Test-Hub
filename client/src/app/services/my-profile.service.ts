import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseServerUrl } from '../../assets/constants';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getProfileData() {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.authService.getToken()}`,
    });

    return this.http.get<any[]>(`${baseServerUrl}/testHub/myProfile/`, {headers: headers}).pipe();
  }

  getEditProfileData() {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.authService.getToken()}`,
    });

    return this.http.get<any[]>(`${baseServerUrl}/auth/editProfile/`, {headers: headers}).pipe();
  }
}
