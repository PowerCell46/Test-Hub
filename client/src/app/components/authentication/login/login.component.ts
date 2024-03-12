import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { passwordStrengthValidator } from '../../../../assets/validators/passwordValidator';
import { baseServerUrl, toastifyParams } from '../../../../assets/constants';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router,
      private authService: AuthenticationService
    ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), passwordStrengthValidator()]],
      password: ['', [Validators.required, Validators.minLength(5), passwordStrengthValidator()]]
    });
  }

  onLoginSubmit(): void {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      
      this.http.post(`${baseServerUrl}auth/login/`, this.loginForm.value).subscribe({
        next: (response: any) => {
          // console.log(response);

          this.authService.saveToken(response.token, response.user);

          this.router.navigate(['/']);
          
        },
        error: (error) => {
          let errorMessage = "Login error: Please try again later."; 
          if (error.error && typeof error.error === 'object') {
            Object.keys(error.error).forEach(key => {
              errorMessage = `${key}: ${error.error[key].join(" ")}`;
            });
          }
          Toastify({
            text: errorMessage,
            duration: 3000,
            close: toastifyParams.close,
            gravity: "top",
            position: "center",
            backgroundColor: toastifyParams.errorBackgroundColor,
          }).showToast();
        }
      });

    } else {
      Toastify({
        text: "Please fill in all required fields correctly.",
        duration: 3000,
        close: toastifyParams.close,
        gravity: "top",
        position: "center",
        backgroundColor: toastifyParams.errorBackgroundColor,
      }).showToast();
    }
  }
}
