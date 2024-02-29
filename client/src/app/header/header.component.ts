import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
}
