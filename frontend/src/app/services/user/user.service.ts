import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/api/users';

  constructor(private router: Router, private http: HttpClient) {}

  createUser(user: User) {
    this.http.post(`${this.url}/signup`, user).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/login']);
    });
  }

  login(email: string, password: string) {
    this.http
      .post(`${this.url}/login`, { email, password })
      .subscribe((response) => {});
  }
}
