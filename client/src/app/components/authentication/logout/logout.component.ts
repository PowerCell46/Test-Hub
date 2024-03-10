import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseServerUrl, toastifyParams } from '../../../../assets/constants';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  onLogoutClick(): void {
    if (this.authService.isLoggedIn()) {
      const headers = new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      });

      this.http.post(`${baseServerUrl}auth/logout/`, {}, {headers: headers}).subscribe({
        next: () => {
          this.authService.logout();

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(error);
          Toastify({
            text: "Logout error: Please try again later.",
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
}
