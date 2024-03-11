import { Component, OnInit } from '@angular/core';
import { MyProfileService } from '../../../services/myProfile/my-profile.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { baseServerUrl, toastifyParams } from '../../../../assets/constants';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  deleteProfileVisible: boolean = false;
  deleteProfileOpacity: number = 0;

 
  userData: any = {};
  constructor( 
    private http: HttpClient,
    private myProfileService: MyProfileService,
    private authService: AuthenticationService,
    private router: Router
  ) {}


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
    this.http.delete(`${baseServerUrl}auth/deleteProfile/`, {headers: this.authService.getHeaders()})
    .subscribe({
      next: () => {

        Toastify({
          text: "Successful Account Deletion!",
          duration: 3000,
          close: toastifyParams.close,
          gravity: "top",
          position: "center",
          backgroundColor: toastifyParams.successBackgroundColor,
        }).showToast();
        
        setTimeout(() => {
          this.authService.logout();
          this.router.navigate(['/']);
        }, 3000);
        
      }, 
      error: (error) => {
        console.error(error); 
        Toastify({
          text: `Delete Profile error: Please try again later.`,
          duration: 3000,
          close: toastifyParams.close,
          gravity: "top",
          position: "center",
          backgroundColor: toastifyParams.errorBackgroundColor,
        }).showToast();
      }
    });
  }
}
