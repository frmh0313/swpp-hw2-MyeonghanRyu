import {Component, Input, OnInit} from "@angular/core";
import {BlogService, Comment, User} from "../blog.service";
import { FormsModule } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'comment-detail',
  template: `
    <comment-display [display]="!isEditMode"
                     [author]="author"
                     [comment]="comment"
    ></comment-display>
    <comment-edit [display]="isEditMode"
                  [author]="author"
                  [comment]="comment"
    ></comment-edit>
    <div *ngIf="author">
      <button *ngIf="isEditMode===false && service.getSignInedUser().id === comment.author_id" (click)="edit()">Edit</button>
      <button *ngIf="isEditMode===true && service.getSignInedUser().id === comment.author_id" (click)="save()">Save</button>
    </div>

  `
})
export class CommentDetailComponent implements OnInit {
  @Input() comment: Comment;
  author: User;
  isEditMode: boolean = false;

  constructor(private service: BlogService,
              private router: Router) { }

  ngOnInit(): void{
    this.getUser();
  }

  getUser(): void {
    this.service.getUser(this.comment.author_id)
      .then(author => this.author = author);
  }

  edit(): void {
    this.isEditMode = !this.isEditMode;
  }

  save(): void {
    this.service.updateComment(this.comment)
      .then(() => this.isEditMode = !this.isEditMode);
  }

  /*
  constructor(private service: BlogService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.service.getComment(+params.get('id')))
      .subscribe(comment => this.comment = comment);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.service.updateComment(this.comment)
      .then(() => this.goBack());
  }
  */

}
