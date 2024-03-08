import { Component, OnInit } from '@angular/core';
import { MyProfileService } from '../../../services/my-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userDetails: any = {};
  editProfileForm: FormGroup;

  constructor(private profileService: MyProfileService, private formBuilder: FormBuilder) {
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      gender: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      nationality: ['', [Validators.required, Validators.minLength(2)]]
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
      nationality: this.userDetails.nationality
    });
  }

  onEditProfileSubmit(): void {
    console.log(this.editProfileForm.value);
    
    if (this.editProfileForm.valid) {
      // Perform your submission logic here
    }
  }
}
