import {Component, EventEmitter, Input, Output} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {Article, BlogService, Comment} from "../blog.service";
import {Location} from "@angular/common";

@Component({
  selector: 'comment-create',
  template: `
    <h1>댓글 쓰기</h1>
    <input [(ngModel)]="content" placeholder="content"/>
    <button (click)="save()">Save</button>
    <button (click)="cancel()">Cancel</button>
  `
})
export class CommentCreateComponent {
  @Output() onCreate: EventEmitter<Comment> = new EventEmitter();
  content: string;
  @Input() articleId: number;

  constructor(private service: BlogService,
              private location: Location) {
  }

  save(): void {
    if (!this.content) {
      window.alert("You need to type in the content");
      return;
    } else {
      const userId = this.service.getSignInedUser().id;
      this.service.createComment(userId, this.articleId, this.content)
        .then(comment => {
          console.log(this.service.getSignInedUser());
          console.log('comment: ', comment)
          return comment
        })
        .then(comment => this.onCreate.emit(comment))
    }
    this.content = "";
  }

  cancel(): void {
    this.content = "";
  }

}
