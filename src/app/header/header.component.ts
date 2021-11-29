import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';

import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogin = false;
  userId: string = '';
  username: string = '';
  private authListenerSub!: Subscription;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.isLogin = this.userService.getIsAuthenticated();
    this.userId = this.userService.getUserId();

    this.userService.getUser(this.userId).subscribe((user) => {
      this.username = user.username;
    });

    this.authListenerSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLogin = authStatus;
        this.userId = this.userService.getUserId();

        this.userService.getUser(this.userId).subscribe((user) => {
          this.username = user.username;
        });
      });
  }

  onLogout() {
    this.username = '';
    this.userService.logout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }
}
