import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/api/users';
  private token: string = '';
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  createUser(user: User) {
    this.http.post(`${this.url}/signup`, user).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/login']);
    });
  }

  login(email: string, password: string) {
    this.http
      .post<{ token: string }>(`${this.url}/login`, { email, password })
      .subscribe((response) => {
        this.token = response.token;

        if (this.token !== '') {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }

        this.router.navigate(['/']);
      });
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
