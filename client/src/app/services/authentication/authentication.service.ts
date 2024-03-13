import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../assets/interfaces/main-interfaces';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  private teacher = new BehaviorSubject<boolean>(this.isTeacher());

  
  loginStatus = this.loggedIn.asObservable();
  teacherStatus = this.teacher.asObservable();


  constructor() { }


  saveToken(token: string, user: User, is_teacher: boolean): void {  
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('isTeacher', JSON.stringify(is_teacher));
 
    this.updateStatuses(true, is_teacher);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  isTeacher(): boolean {
    const item = localStorage.getItem('isTeacher');
    return JSON.parse(item !== null ? item : 'false');
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isTeacher');
    this.updateStatuses(false, false);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }


  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Token ${this.getToken()}`
    });
  }


  private updateStatuses(isLoggedIn: boolean, isTeacher: boolean): void {
    this.loggedIn.next(isLoggedIn);
    this.teacher.next(isTeacher);
  }
}
