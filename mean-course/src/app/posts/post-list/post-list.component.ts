import { Component, OnInit, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() posts: Post[] = [
    // {
    //   title: 'First post',
    //   content: 'First post content'
    // },
    // {
    //   title: 'Second post',
    //   content: 'Second post content'
    // },
    // {
    //   title: 'Third post',
    //   content: 'Third post content'
    // }
  ];

  private postsSub: Subscription;

  constructor(public postService: PostsService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
