import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLoggedIn: boolean = false;
  username: string | null = null;
  private authSubscription!: Subscription;
  
  constructor(
    public authService: AuthenticationService
  ) {}

  navigationVisible: boolean = true;
  navigationOpacity: number = 1;
  
  hiddenMenuVisible: boolean = false;
  hiddenMenuOpacity: number = 0;

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

  hideShowHiddenMenu(): void {
    if (this.hiddenMenuVisible) {
        this.hiddenMenuOpacity = 0;
        setTimeout(() => this.hiddenMenuVisible = false, 500);
    
    } else {
        this.hiddenMenuVisible = true;
        setTimeout(() => this.hiddenMenuOpacity = 1, 250);
    }
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.loginStatus.subscribe(status => {
      this.isLoggedIn = status;
      this.username = localStorage.getItem('username');
    });
    this.username = localStorage.getItem('username');
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
