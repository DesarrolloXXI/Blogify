import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostService } from '../services/post.service';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  errorMessage = 'Este campo es requerido.';
  private isEditing = false;
  private postId!: string;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isEditing = true;
        this.postId = paramMap.get('postId')!;
      } else {
        this.isEditing = false;
      }
    });
  }

  addPost(form: NgForm) {
    if (form.valid) {
      this.postService.addPost(form.value);
      form.resetForm();
    }
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
