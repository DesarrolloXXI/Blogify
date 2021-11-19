import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../models/post.model';
import { PostService } from '../services/post/post.service';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSub: Subscription;

  constructor(public postService: PostService, public dialog: MatDialog) {
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
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
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
