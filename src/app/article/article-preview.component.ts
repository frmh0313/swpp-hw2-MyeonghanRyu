import {Component, Input} from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'preview',
  template: `
    <!--<div *ngIf="title && content">-->
    <h1>Preview</h1>
      <label>title</label><p>{{title}}</p>
    <!--<label>title</label><p [(ngModel)]="title">{{title}}</p>-->
    <!--<label>Content</label><p [(ngModel)]="content"></p>-->
    <label>content</label><p>{{content}}</p>
    <!--</div>-->
  `
})
export class ArticlePreviewComponent {
  @Input() title: string;
  @Input() content: string;
}
