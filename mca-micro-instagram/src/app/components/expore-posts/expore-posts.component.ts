import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-expore-posts',
  templateUrl: './expore-posts.component.html',
  styleUrls: ['./expore-posts.component.css'],
})
export class ExporePostsComponent implements OnInit {
  posts: Post[] = [];
  page: number = 1;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .getPosts(this.page)
      .subscribe((result) => (this.posts = result));
  }

  onScroll(): void {
    this.postService.getPosts(++this.page).subscribe((post: Post[]) => {
      this.posts.push(...post);
    });
  }
}
