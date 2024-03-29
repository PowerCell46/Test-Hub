import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordStrengthValidator } from '../../../../assets/validators/passwordValidator';
import { HttpClient } from '@angular/common/http';
import { baseServerUrl, toastifyParams } from '../../../../assets/constants';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './register.component.media-queries.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  formSubmitted: boolean = false;
  passwordFieldType: string = 'password';

  showPassword(show: boolean): void {
    this.passwordFieldType = show ? 'text' : 'password';
  }
  
  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router,
      public authService: AuthenticationService
    ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), passwordStrengthValidator()]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6), passwordStrengthValidator()]]
    });
  }

  onRegisterSubmit(): void {
    this.formSubmitted = true;
    
    if (this.registerForm.valid) {
      // console.log(this.registerForm.value);
      
      this.http.post(`${baseServerUrl}auth/register/`, { // Doing this in order to fulfill the Backend's requirements
          username: this.registerForm.value['username'], 
          email: this.registerForm.value['email'], 
          first_name: this.registerForm.value['firstName'],
          last_name: this.registerForm.value['lastName'],
          password: this.registerForm.value['password'],
          password2: this.registerForm.value['password']
      }).subscribe({
        next: (response: any): void => {
          // console.log(response);

          this.authService.saveToken(response.token, response.user, response.is_teacher);

          this.router.navigate(['/']);
          
        },
        error: (error) => {
          let errorMessage = "Registration error: Please try again later."; 
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
