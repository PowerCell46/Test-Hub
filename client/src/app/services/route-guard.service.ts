import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate():boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;

    } else {
      return true;
    }
  }
}
