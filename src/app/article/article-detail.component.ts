import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {Article, User} from "../blog.service";
import {Comment, BlogService} from "../blog.service";
import {Location} from "@angular/common";
import 'rxjs/add/operator/SwitchMap';

@Component({
  template: `
    <div *ngIf="article && author && comments">
      <h2>{{ article.title }}</h2>
      <p>{{ getAuthorName() }}</p>
      <p>{{ article.content }}</p>
      <button *ngIf="service.getSignInedUser().id == article.author_id" (click)="edit()">Edit</button>
      <button *ngIf="service.getSignInedUser().id == article.author_id" (click)="delete()">Delete</button>
      <button (click)="back()">Back</button>
      <h3>Comments</h3>
      <comments [articleId]="article.id"></comments>
    </div>
  `
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  author: User;  // 직접 가져오지 않고 부모 component에서 넘겨받을 수 있는 방법?
  comments: Comment[];
//TODO
  /*
  comment 추가후 push도 필요할 수 있음.
   */
  constructor(private service: BlogService,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.service.getArticle(+params.get('id')))
      .subscribe(article => {
        console.log(article);
        this.article = article;
        this.getAuthor(this.article.author_id);
      });
    console.log(this.getComments);
    this.getComments();
  }

  getAuthor(id: number): void {
    this.service.getUser(id)
      .then(author => {
        console.log("I am author: ", author);
        this.author = author
      });
  }

  getAuthorName(): string {
    return this.author.name;
  }

  getComments(): void {
    this.service.getComments().then(comments => this.comments = comments);
  }

  edit(): void {
    this.router.navigate(['/articles', this.article.id, 'edit']);
  }

  delete(): void {
    // this.service.delete("article", this.article.id)
    //   .then(() => {
    //     this.back();
    //   });
    this.service.deleteArticle(this.article.id)
      .then(() => {
      this.back();
      });
  }

  back(): void {
    this.router.navigate(['/articles']);
  }
}
