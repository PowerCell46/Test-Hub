import { Component, OnInit } from '@angular/core';
import { MyProfileService } from '../../../services/my-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  userDetails: any = {};
  constructor(private profileService: MyProfileService) {}

  ngOnInit(): void {
    this.profileService.getEditProfileData().subscribe(data => {
      this.userDetails = data;
    });
  }
}
