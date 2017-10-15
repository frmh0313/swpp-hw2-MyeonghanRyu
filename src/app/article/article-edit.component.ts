import {Component, Input, OnInit} from "@angular/core";
import {Article, BlogService} from "../blog.service";
import { Location } from "@angular/common";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import { FormsModule, NgModel } from "@angular/forms";
import 'rxjs/add/operator/SwitchMap';

@Component({
  template: `
    <div *ngIf="article">
      <input [(ngModel)]="article.title" placeholder="title"/>
      <textarea [(ngModel)]="article.content" placeholder="content"></textarea>
      <button (click)="save()">Save</button>
      <button (click)="goBack()">Back</button>
      <preview [title]="article.title" [content]="article.content"></preview>
    </div>
  `
})
export class ArticleEditComponent implements OnInit{
  article: Article;
  constructor(private service: BlogService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit():void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.service.getArticle(+params.get('id')))
      .subscribe(article => this.article = article);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.service.updateArticle(this.article)
      .then(() => this.goBack());
  }
}
