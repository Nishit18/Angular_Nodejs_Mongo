import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, concat } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    // return [...this.posts];
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string, posts: any, maxPosts: number }>(apiUrl + '/posts' + queryParams)
      .pipe(map((postData) => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
              creator: post.creator
            };
          }),
          maxPosts: postData.maxPosts
        };
      }))
      .subscribe((transformPostData) => {
        this.posts = transformPostData.posts;
        this.postsUpdated.next(
          {
            posts: [...this.posts],
            postCount: transformPostData.maxPosts
          });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    // const post: Post = { id: null, title, content };
    // this.http.post<{ message: string, postId: string }>(apiUrl+'/posts', post)
    //   .subscribe((response) => {
    //     // console.log(response.message);
    //     const postId = response.postId;
    //     post.id = postId;
    //     this.posts.push(post);
    //     this.postsUpdated.next([...this.posts]);
    //     this.router.navigate(["/"]);
    //   });
    // // this.posts.push(post);
    // // this.postsUpdated.next([...this.posts]);

    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http.post<{ message: string, post: Post }>(apiUrl + '/posts', postData)
      .subscribe((response) => {
        // const post: Post = {
        //   id: response.post.id,
        //   title: title,
        //   content: content,
        //   imagePath: response.post.imagePath
        // }
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(apiUrl + '/posts/' + postId);
    // .subscribe(() => {
    //   // console.log('Deleted');
    //   const updatedPosts = this.posts.filter(posts => posts.id !== postId);
    //   this.posts = updatedPosts;
    //   this.postsUpdated.next([...this.posts]);
    // });
  }

  getPost(postId: string) {
    // return { ...this.posts.find(p => p.id === postId) };
    return this.http.get<{ _id: string; title: string; content: string; imagePath: string; creator: string }>('http://localhost:3000/api/posts/' + postId);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    // const post: Post = { id: id, title: title, content: content, imagePath: null };
    let postData: Post | FormData;
    if (typeof (image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    }
    else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http.put(apiUrl + '/posts/' + id, postData)
      .subscribe(response => {
        // const updatedPosts = [...this.posts];
        // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        // const post = {
        //   id: id,
        //   title: title,
        //   content: content,
        //   imagePath: ""
        // };
        // updatedPosts[oldPostIndex] = post;
        // this.posts = updatedPosts;
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }
}
