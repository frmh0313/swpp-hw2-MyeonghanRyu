import {Component, Input} from "@angular/core";
import { User } from "../blog.service";

@Component({
  selector: 'comment-display',
  template: `
    <div *ngIf="display && comment && author">
      <p>{{ author.name }}  {{ comment.content }}</p>
    </div>
  `
})
export class CommentDisplayComponent {
  @Input() comment: Comment
  @Input() author: User;
  @Input() display: boolean;

}
