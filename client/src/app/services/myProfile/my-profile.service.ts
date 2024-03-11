import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseServerUrl } from '../../../assets/constants';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {
  requestUrl: string = `${baseServerUrl}/auth/`;
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  
  getProfileData() {
    return this.http.get<any[]>(`${this.requestUrl}myProfile/`, {headers: this.authService.getHeaders()}).pipe();
  }


  getEditProfileData() {
    return this.http.get<any[]>(`${this.requestUrl}editProfile/`, {headers: this.authService.getHeaders()}).pipe();
  }
}
