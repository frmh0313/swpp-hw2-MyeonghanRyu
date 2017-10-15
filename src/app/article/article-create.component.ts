import { Component } from "@angular/core";
import { BlogService, Article } from "../blog.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  template:
      `
    <input [(ngModel)]="title" placeholder="Type in title"/>
    <input [(ngModel)]="content" placeholder="Type in content"/>
    <button (click)="save()">Save</button>
    <button (click)="goBack()">Back</button>
    <preview [title]="title" [content]="content"></preview>
  `
})

export class ArticleCreateComponent {
  title: string;
  content: string;

  constructor(private service: BlogService,
              private router: Router) { }

  save(): void {
    if (!this.title ||
      !this.content) {
      window.alert("제목과 내용 모두 입력해야합니다.");
      return; //?
    } else {
      this.service.createArticle(this.service.getSignInedUser().id, this.title, this.content)
        .then(article  => {
          this.router.navigate(['/articles', article.id]);
        })
    }
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }
}
