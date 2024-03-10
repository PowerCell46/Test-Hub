import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../assets/interfaces/main-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  loginStatus = this.loggedIn.asObservable();

  constructor() { }

  saveToken(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.username);
    this.updateLoginStatus(true); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.updateLoginStatus(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private updateLoginStatus(isLoggedIn: boolean): void {
    this.loggedIn.next(isLoggedIn);
  }
}
