import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errorMessage = 'Campo inválido';
  user: User = { name: '', email: '', password: '' };

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.createUser(form.value).subscribe((user) => {
      this.router.navigate(['/login']);
    });
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
