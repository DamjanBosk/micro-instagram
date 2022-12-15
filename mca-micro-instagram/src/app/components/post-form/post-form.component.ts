import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "src/app/models/post";
import { PostService } from "src/app/services/post.service";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "app-post-form",
    templateUrl: "./post-form.component.html",
    styleUrls: ["./post-form.component.css"],
})
export class PostFormComponent implements OnInit {
    post: Post | undefined;
    postForm!: FormGroup;
    isFormDirty: boolean = false;
  
    constructor(
      private postService: PostService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.postForm = this.formBuilder.group({
        albumId: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]*[1-9][0-9]*$'),
            Validators.min(1),
          ],
        ],
        title: ['', [Validators.required]],
        thumbnailUrl: ['', [Validators.required]],
        url: ['', [Validators.required]],
      });
  
      this.postForm.valueChanges.subscribe((e) => (this.isFormDirty = true));
  
      if (!this.isEdit()) return;
  
      let id = Number(this.route.snapshot.paramMap.get('id'));
      this.postService.getPost(id).subscribe((result) => {
        this.post = result;
        this.setFormValues();
      });
    }
  
    onCreate() {
      this.isFormDirty = false;
  
      this.post = {
        id: this.generateUniqueId(),
        albumId: this.postForm.value.albumId,
        title: this.postForm.value.title,
        thumbnailUrl: this.postForm.value.thumbnailUrl,
        url: this.postForm.value.url,
      };
  
      this.postService
        .createPost(this.post)
        .subscribe((result) =>
          this.router.navigateByUrl(`/${result.id} + '/details'`)
        );
    }
  
    onEdit() {
      if (!this.post) return;
  
      this.isFormDirty = false;
  
      this.post.albumId = this.postForm.value.albumId;
      this.post.title = this.postForm.value.title;
      this.post.thumbnailUrl = this.postForm.value.thumbnailUrl;
      this.post.url = this.postForm.value.url;
  
      this.postService
        .editPost(this.post)
        .subscribe((result) =>
          this.router.navigateByUrl(`/${result.id}/details`)
        );
    }
  
    canDeactivate(): boolean {
      return this.isFormDirty;
    }
  
    onBack(): void {
      this.location.back();
    }
  
    isEdit(): boolean {
      return this.route.snapshot.paramMap.get('id') ? true : false;
    }
  
    generateUniqueId(): number {
      return new Date().getTime();
    }
  
    setFormValues(): void {
      if (!this.post) return;
  
      this.postForm.patchValue({
        albumId: this.post.albumId,
        title: this.post.title,
        thumbnailUrl: this.post.thumbnailUrl,
        url: this.post.url,
      });
      this.isFormDirty = false;
    }
  
    get albumId() {
      return this.postForm.get('albumId');
    }
    get title() {
      return this.postForm.get('title');
    }
    get thumbnailUrl() {
      return this.postForm.get('thumbnailUrl');
    }
    get url() {
      return this.postForm.get('url');
    }
  }
  