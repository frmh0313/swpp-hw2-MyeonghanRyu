import {Component, OnInit} from '@angular/core';
import {Article, BlogService, User} from "../blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'article-list',
  template: `
    <div *ngIf="users">
      <ul *ngFor="let article of articles">
        <li>
          <label>ID: </label>{{article.id}}
          <a (click)="gotoArticle(article)"> 
            <label>Title: </label>
            {{ article.title }}</a>
          <label>Author: </label>{{ getUserNameById(article.author_id) }}
        </li>
      </ul>
      <button (click)="create()">Write</button>
    </div>
  `
})
export class ArticleListComponent implements OnInit {
  articles: Article[];
  users: User[];

  constructor(private service: BlogService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getArticles();
    this.getUsers();
  }

  gotoArticle(article: Article): void {
    this.router.navigate(['/articles', article.id]);
  }

  getArticles(): void {
    this.service.getArticles()
      .then(articles => this.articles = articles);
  }

  getUsers(): void {
    this.service.getUsers()
      .then(users => this.users = users);
  }

  getUserNameById(id: number): string {
    return this.users.find(item => item.id === id).name;
  }

  create(): void {
    this.router.navigate(['articles/create']);
  }

}
