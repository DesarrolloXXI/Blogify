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

  addPost(post: Post) {
    this.http
      .post<{ message: string }>(this.url, post)
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
            }) => {
              return {
                id: post._id,
                title: post.title,
                summary: post.summary,
                content: post.content,
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

  updatePost(post: Post, id: string) {
    this.http.put(`${this.url}/${id}`, post).subscribe((response) => {
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
    }>(`${this.url}/${id}`);
  }

  getPostsUpdateListener() {
    return this.postUpdated.asObservable();
  }
}
