import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordStrengthValidator } from '../../assets/validators/passwordValidator';
import { HttpClient } from '@angular/common/http';
import { baseServerUrl } from '../../assets/constants';
// import { RegisterResponse } from '../../assets/interfaces/main-interfaces';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public authService: AuthenticationService) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), passwordStrengthValidator()]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6), passwordStrengthValidator()]]
    });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      // console.log(this.registerForm.value);
      
      this.http.post(`${baseServerUrl}auth/register/`, {
          username: this.registerForm.value['username'], 
          email: this.registerForm.value['email'], 
          firstName: this.registerForm.value['firstName'],
          lastName: this.registerForm.value['lastName'],
          password: this.registerForm.value['password'],
          password2: this.registerForm.value['password']
      }).subscribe({
        next: (response: any) => {
          console.log(response);

          this.authService.saveToken(response.token);

          this.router.navigate(['/']);
          
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }
}
