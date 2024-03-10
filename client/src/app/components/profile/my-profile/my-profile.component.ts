import { Component, OnInit } from '@angular/core';
import { MyProfileService } from '../../../services/my-profile.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../../services/authentication.service';
import { baseServerUrl } from '../../../../assets/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  deleteProfileVisible: boolean = false;
  deleteProfileOpacity: number = 0;

 
  userData: any = {};
  constructor( private http: HttpClient, private myProfileService: MyProfileService, private authService: AuthenticationService, private router: Router) {}


  ngOnInit(): void {
    this.myProfileService.getProfileData().subscribe(data => {
      this.userData = data;
      // console.log(data);         
    });
  }

  showDeleteProfileSection(): void {
      this.deleteProfileVisible = true;
      setTimeout(() => this.deleteProfileOpacity = 1, 250);
  }

  hideDeleteProfileSection(): void {
      this.deleteProfileOpacity = 0;
      setTimeout(() => this.deleteProfileVisible = false, 500);
  }

  onDeleteUserProfile(): void {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    this.http.delete(`${baseServerUrl}auth/deleteProfile/`, {headers: headers})
    .subscribe({
      next: () => {
        this.authService.logout();

        this.router.navigate(['/']);
      }, 
      error: (err) => {
        console.error(err);
      }
    });
  }
}
