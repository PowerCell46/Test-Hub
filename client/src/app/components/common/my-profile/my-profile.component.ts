import { Component, OnInit } from '@angular/core';
import { MyProfileService } from '../../../services/my-profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  userData: any = {};
  constructor(private myProfileService: MyProfileService) {}


  ngOnInit(): void {
    this.myProfileService.getProfileData().subscribe(data => {
      this.userData = data;
      console.log(data);
            
    });
  }
}
