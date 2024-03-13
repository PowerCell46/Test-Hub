import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuardService implements CanActivate{

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isTeacher()) {
      return true
    
    } else {
      this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
