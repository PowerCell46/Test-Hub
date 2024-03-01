import { Component } from '@angular/core';
import { AuthenticationService } from '../../../authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseServerUrl } from '../../../../assets/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private http: HttpClient, private router: Router, public authService: AuthenticationService) {
    
  }

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
        error: err => {
          console.error(err);
        }
      })      
    }
  }
}
