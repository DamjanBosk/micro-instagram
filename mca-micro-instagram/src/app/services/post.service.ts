import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly numOfPostPerRequest: number = 15;
  apiUrl: string = 'https://jsonplaceholder.typicode.com/photos';
  // apiUrl: string = 'http://localhost:3000/photos';

  constructor(private http: HttpClient) {}

  getPosts(page: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      this.apiUrl +
        `?_sort=id&_order=desc&_page=${page}&_limit=${this.numOfPostPerRequest}`
    );
  }

  getPost(id: number) {
    return this.http.get<Post>(this.apiUrl + `/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.apiUrl + `/${post.id}`, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(this.apiUrl + `/${id}`);
  }
}
