import { Component, OnInit, EventEmitter, Output, forwardRef } from '@angular/core';
import { OutletContext } from '@angular/router';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';

  @Output() postCreated = new EventEmitter();

  constructor(public postsServices: PostsService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post);
    this.postsServices.addPost(form.value.title, form.value.content);
    form.reset();
  }
}
