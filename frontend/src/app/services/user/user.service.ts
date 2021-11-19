import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: User) {
    this.http.post(this.url, user).subscribe((response) => {
      console.log(response);
    });
  }
}
