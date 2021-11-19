import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../models/post.model';

import { PostService } from '../services/post/post.service';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  errorMessage = 'Este campo es requerido.';
  private isEditing = false;
  private postId!: string;
  post: Post = {
    id: '',
    title: '',
    summary: '',
    content: '',
  };

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isEditing = true;
        this.postId = paramMap.get('postId')!;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            summary: postData.summary,
            content: postData.content,
          };
        });
      } else {
        this.isEditing = false;
        this.postId = null!;
      }
    });
  }

  savePost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.isEditing) {
      this.postService.updatePost(form.value, this.postId);
    } else {
      this.postService.addPost(form.value);
    }

    form.resetForm();
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
