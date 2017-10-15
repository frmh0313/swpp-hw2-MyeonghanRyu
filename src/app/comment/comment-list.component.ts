import {Component, Input, OnInit} from "@angular/core";
import {Comment, BlogService, User} from "../blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'comments',
  template: `
    <div *ngIf="comments">
      <ul *ngFor="let comment of comments">
        <div *ngIf="comment">
          <comment-detail [comment]="comment"></comment-detail>
          <button *ngIf="service.signedInUser.id === comment.author_id" (click)="delete(comment)">X</button>
        </div>
      </ul>
      <comment-create
        (onCreate)=onCreate($event)
        [articleId]="articleId"
      ></comment-create>
    </div>
    <!--/* TODO -->
    <!--// 댓글 입력창. -->
    <!--추가 가능하도록. -->
    <!--선택된 유저에 의해서만 수정 삭제 가능하도록-->
    <!---->
    <!---->
    <!--댓글 수정기능 어떻게 구현?-->
    <!--comment detail component??-->
    <!--*/-->
  `
})
export class CommentListComponent implements OnInit {
  @Input() articleId: number;
  users: User[];
  comments: Comment[];

  constructor(private service: BlogService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getComments();
    this.getUsers();
  }

  getComments(): void {
    this.service.getComments()
      .then(comments => {
        this.comments = comments.filter(item => item.article_id === this.articleId)
      })
  }

  getUsers(): void {
    this.service.getUsers()
      .then(users => this.users = users)
  }

  getUserNameById(id: number): string {
    return this.users.find(item => item.id === id).name;
  }

  delete(comment: Comment): void {
    // this.service.delete("comment", comment.id)
    //   .then(() =>
    //     this.comments = this.comments.filter(item => item !== comment));
    this.service.deleteComment(comment.id)
      .then(() =>
      this.comments = this.comments.filter(item => item !== comment));
  }

  onCreate(comment: Comment) {
    this.comments.push(comment);
  }
}
