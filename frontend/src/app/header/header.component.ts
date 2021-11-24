import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  private authListenerSub!: Subscription;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.isLogin = this.userService.getIsAuthenticated();
    this.authListenerSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLogin = authStatus;
      });
  }
}
