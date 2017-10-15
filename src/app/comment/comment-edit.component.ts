import {Component, Input} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {BlogService, User} from "../blog.service";

@Component({
  selector: 'comment-edit',
  template: `
    <div *ngIf="display && comment && author">
      <input [(ngModel)]="comment.content"/>
    </div>
  `
})
export class CommentEditComponent {
  @Input() comment: Comment;
  @Input() author: User;
  @Input() display: boolean;

}
