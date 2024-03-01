import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLoggedIn: boolean = false;
  private authSubscription!: Subscription;
  
  constructor(public authService: AuthenticationService) {}

  navigationVisible: boolean = true;
  navigationOpacity: number = 1;

  hideShowNavigation(event: any): void {
    if (this.navigationVisible) {
        event.target.style.transform = 'rotate(0deg)';
        this.navigationOpacity = 0;
        setTimeout(() => this.navigationVisible = false, 500);
    
    } else {
        event.target.style.transform = 'rotate(90deg)';
        this.navigationVisible = true;
        setTimeout(() => this.navigationOpacity = 1, 250);
    }
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.loginStatus.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
