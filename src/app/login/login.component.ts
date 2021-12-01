import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
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

  constructor(
    public userService: UserService,
    private socialAuthService: SocialAuthService
  ) {}

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

  loginWithGoogle() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((result) => {
        const user: User = {
          email: result.email,
          name: result.name,
          password: new Date().toISOString(),
        };

        this.userService.createUser(user).subscribe((user) => {
          this.userService.afterLogin({
            token: result.idToken,
            expiresIn: 3600,
            userId: user.userId,
          });
        });

        //this.userService.afterLogin({ token: result.idToken, expiresIn: 3600, userId: });
      });
  }
}
