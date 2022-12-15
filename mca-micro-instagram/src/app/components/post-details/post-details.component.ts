import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  id!: number;
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.postService
      .getPost(this.id)
      .subscribe((result) => (this.post = result));
  }

  onDelete(id: number) {
    if (confirm(`Are you sure?`)) {
      this.postService.deletePost(id).subscribe();
      this.onBack();
    }
  }

  onBack(): void {
    this.location.back();
  }
}
