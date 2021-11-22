import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage = 'Campo inválido';
  user: User = { name: '', email: '', password: '' };

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  getErrorMessage() {
    return this.errorMessage;
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.login(form.value.email, form.value.password);
  }
}
