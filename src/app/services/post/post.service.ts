import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url = 'http://localhost:3000/api/posts';

  posts: Post[] = [];
  postUpdated = new Subject<Post[]>();

  constructor(private router: Router, private http: HttpClient) {}

  addPost(post: Post, imagen: File) {
    console.log(post);
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('summary', post.summary);
    postData.append('content', post.content);
    postData.append('image', imagen, post.title);
    console.log(postData);

    this.http
      .post<{ message: string }>(this.url, postData)
      .subscribe((response) => {
        console.log(response);
        this.posts.push(post);
        // Generar notificacion de actualizacion a los componentes suscritos al Subject
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  getPosts() {
    this.http
      .get<any>(this.url)
      .pipe(
        map((postsData) => {
          return postsData.map(
            (post: {
              _id: string;
              title: string;
              summary: string;
              content: string;
              imageUrl: string;
              author: string;
            }) => {
              return {
                id: post._id,
                title: post.title,
                summary: post.summary,
                content: post.content,
                imageUrl: post.imageUrl,
                author: post.author,
              };
            }
          );
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.posts = response;
        this.postUpdated.next([...this.posts]);
      });
  }

  deletePost(id: string) {
    this.http.delete(`${this.url}/${id}`).subscribe((response) => {
      console.log(response);
      const postsFiltered = this.posts.filter((post) => post.id != id);
      this.posts = postsFiltered;
      this.postUpdated.next([...this.posts]);
    });
  }

  updatePost(post: Post, id: string, image: File | string) {
    let postData: Post | FormData;

    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', post.title);
      postData.append('summary', post.summary);
      postData.append('content', post.content);
      postData.append('image', image, post.title);
    } else {
      postData = post;
    }

    this.http.put(`${this.url}/${id}`, postData).subscribe((response) => {
      const newPosts = [...this.posts];
      const oldPostIndex = newPosts.findIndex((post) => post.id === id);
      newPosts[oldPostIndex] = post;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      summary: string;
      content: string;
      imageUrl: string;
      author: string;
    }>(`${this.url}/${id}`);
  }

  getPostsUpdateListener() {
    return this.postUpdated.asObservable();
  }
}
