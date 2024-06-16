import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum AuthOutcome {
  Success = 'success',
  Failure = 'failure',
  Error = 'error',
}

export enum AuthStatus {
  LoggedIn = 'loggedIn',
  LoggedOut = 'loggedOut',
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';
  private authStatusSubject: BehaviorSubject<AuthStatus>;
  localStorage?: Storage;

  
  constructor(private http: HttpClient,@Inject(DOCUMENT) private document: Document,) {
    this.localStorage = this.document.defaultView?.localStorage;
    this.authStatusSubject = new BehaviorSubject<AuthStatus>(
      this.isLoggedIn() ? AuthStatus.LoggedIn : AuthStatus.LoggedOut
    );
  }

  get authStatus(): Observable<AuthStatus> {
    return this.authStatusSubject.asObservable();
  }

  signup(user: any): Promise<AuthOutcome> {
    const url = `${this.apiUrl}/signup`;
    return new Promise((resolve, reject) => {
      this.http.post(url, user).subscribe(
        {
          next:(response: any) => {
            console.log(response);
            if (response.token) {
              this.localStorage?.setItem('token', response.token);
              resolve(AuthOutcome.Success);
              this.authStatusSubject.next(AuthStatus.LoggedIn);
            } else {
              reject(AuthOutcome.Failure);
            }
          
        },
        error:(error) => {
          console.log(error);
          reject(AuthOutcome.Error);
        }}
      );
    });
  }

  login(credentials: any): Promise<AuthOutcome> {
    const url = `${this.apiUrl}/login`;
    return new Promise((resolve, reject) => {
      this.http.post(url, credentials).subscribe(
        {
          next:(response: any) => {
            if (response.token) {
              this.localStorage?.setItem('token', response.token);
              resolve(AuthOutcome.Success);
              this.authStatusSubject.next(AuthStatus.LoggedIn);
            } else {
              reject(AuthOutcome.Failure);
            } 
        },
        error:(error) => {
          console.log(error);
          reject(AuthOutcome.Error);
        }}
      );
    });
  }

  logout(): void {
    this.localStorage?.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.localStorage?.getItem('token');
  }
}
