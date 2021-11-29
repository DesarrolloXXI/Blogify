import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../models/post.model';
import { PostService } from '../services/post/post.service';

import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSub: Subscription;
  isAuth: boolean = false;
  userId: string = '';
  authSub!: Subscription;

  constructor(
    public postService: PostService,
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.postsSub = this.postService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnInit(): void {
    this.postService.getPosts();

    this.postsSub = this.postService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });

    this.isAuth = this.userService.getIsAuthenticated();
    this.userId = this.userService.getUserId();
    this.authSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus: boolean) => {
        this.isAuth = authStatus;
        this.userId = this.userService.getUserId();
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authSub.unsubscribe();
  }

  onDelete(id: string) {
    console.log(id);
    this.postService.deletePost(id);

    const dialogRef = this.dialog.open(DeleteMessage);
  }
}

@Component({
  selector: 'delete-msg',
  templateUrl: 'delete-msg.component.html',
})
export class DeleteMessage {}
