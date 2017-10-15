import {Component, OnInit} from '@angular/core';
import { SignInComponent } from "./sign-in.component";
import {BlogService, User} from "./blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="service.signedInUser !==null">
      <label>User: </label> {{ service.signedInUser.name }}
    </div>
    <button *ngIf="service.signedInUser !== null" (click)="signOut()">SignOut</button>
    <router-outlet></router-outlet>
`,
  // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service: BlogService,
              private router: Router) { }


  signInedUser: User;
  isSignIned = this.signInedUser !== null;


  ngOnInit(): void {
    this.signInedUser = this.service.getSignInedUser();
    this.isSignIned = this.signInedUser !== null;
  }

  signOut(): void {
    this.service.signOut();
    this.router.navigate(['/sign_in']);
  }

}
