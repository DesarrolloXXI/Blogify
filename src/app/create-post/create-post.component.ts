import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post/post.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  form!: FormGroup;
  imagePreview: string = '';
  errorMessage = 'Este campo es requerido.';
  private isEditing = false;
  private postId!: string;
  post: Post = {
    id: '',
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    author: '',
  };

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      summary: new FormControl(''),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

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
            imageUrl: postData.imageUrl,
            author: postData.author,
          };

          this.form.setValue({
            title: this.post.title,
            summary: this.post.summary,
            content: this.post.content,
            image: this.post.imageUrl,
          });
          this.imagePreview = this.post.imageUrl;
        });
      } else {
        this.isEditing = false;
        this.postId = null!;
      }
    });
  }

  savePost() {
    if (this.form.invalid) {
      return;
    }

    if (this.isEditing) {
      this.postService.updatePost(
        this.form.value,
        this.postId,
        this.form.value.image
      );
    } else {
      this.postService.addPost(this.form.value, this.form.value.image);
    }

    this.form.reset();
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
