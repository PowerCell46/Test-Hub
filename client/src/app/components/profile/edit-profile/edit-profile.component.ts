import { Component, OnInit } from '@angular/core';
import { MyProfileService } from '../../../services/myProfile/my-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { baseServerUrl } from '../../../../assets/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userDetails: any = {};
  editProfileForm: FormGroup;

  constructor(private profileService: MyProfileService, private formBuilder: FormBuilder, private authService: AuthenticationService, private http: HttpClient, private router: Router) {    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      gender: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      nationality: ['', [Validators.required, Validators.minLength(2)]],
      // profilePicture: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.profileService.getEditProfileData().subscribe(data => {
      this.userDetails = data;
      this.updateForm();
    });
  }

  updateForm(): void {
    this.editProfileForm.patchValue({
      firstName: this.userDetails.firstName,
      lastName: this.userDetails.lastName,
      gender: this.userDetails.gender,
      telephone: this.userDetails.phone_number,
      nationality: this.userDetails.nationality,
      // profilePicture: this.userDetails.image
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editProfileForm.get('profilePicture')?.setValue(file);
    }
  }

  onEditProfileSubmit(): void {
    console.log(this.editProfileForm.value);
    
    // if (this.editProfileForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.editProfileForm.get('firstName')?.value ?? '');
      formData.append('lastName', this.editProfileForm.get('lastName')?.value ?? '');
      formData.append('gender', this.editProfileForm.get('gender')?.value ?? '');
      formData.append('telephone', this.editProfileForm.get('telephone')?.value ?? '');
      formData.append('nationality', this.editProfileForm.get('nationality')?.value ?? '');

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('profilePicture', fileInput.files[0]);
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    this.http.post(`${baseServerUrl}auth/editProfile/`, formData, {headers: headers})
    .subscribe({
      next: () => {
        this.router.navigate(['/myProfile']);
      },
      error(err) {
        console.error(err);
      },
    })
    }
  // }
}


