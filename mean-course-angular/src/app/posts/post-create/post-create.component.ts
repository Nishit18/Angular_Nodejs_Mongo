import { Component, OnInit, EventEmitter, Output, forwardRef } from '@angular/core';
import { OutletContext, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  @Output() postCreated = new EventEmitter();

  constructor(public postsServices: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        // this.post = this.postsServices.getPost(this.postId);
        this.isLoading = true;
        this.postsServices.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = { id: postData._id, title: postData.title, content: postData.content };
          this.form.setValue({ 'title': this.post.title, 'content': this.post.content });
        });
      }
      else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post);
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsServices.addPost(this.form.value.title, this.form.value.content);
    }
    else {
      this.postsServices.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }

    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ 'image': file });
    this.form.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      debugger;
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
}
