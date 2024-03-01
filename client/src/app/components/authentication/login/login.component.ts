import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { passwordStrengthValidator } from '../../../../assets/validators/passwordValidator';
import { baseServerUrl } from '../../../../assets/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public authService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), passwordStrengthValidator()]],
      password: ['', [Validators.required, Validators.minLength(5), passwordStrengthValidator()]]
    });
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      
      this.http.post(`${baseServerUrl}auth/login/`, this.loginForm.value).subscribe({
        next: (response: any) => {
          // console.log(response);

          this.authService.saveToken(response.token);

          this.router.navigate(['/']);
          
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }
}
