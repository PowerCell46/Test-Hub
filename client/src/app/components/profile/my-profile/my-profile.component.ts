import { Component, OnInit } from '@angular/core';
import { MyProfileService } from '../../../services/my-profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  deleteProfileVisible: boolean = false;
  deleteProfileOpacity: number = 0;

 
  userData: any = {};
  constructor(private myProfileService: MyProfileService) {}


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
}
