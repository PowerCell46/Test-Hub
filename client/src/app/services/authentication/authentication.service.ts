import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../assets/interfaces/main-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  loginStatus = this.loggedIn.asObservable();

  constructor() { }

  saveToken(token: string, user: User): void {
    console.log(user);
    
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.username);
    this.updateLoginStatus(true); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.updateLoginStatus(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private updateLoginStatus(isLoggedIn: boolean): void {
    this.loggedIn.next(isLoggedIn);
  }
}
