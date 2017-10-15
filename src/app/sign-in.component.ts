import { Component, OnInit } from "@angular/core";
import { BlogService, User } from "./blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'signin',
  template: `
    <label>Email address: </label>
    <input #email placeholder="Email"/>
    <label>Password: </label>
    <input #password placeholder="password">
    <button (click)="login(email.value, password.value)">SignIn</button>
  `
})
export class SignInComponent implements OnInit {
  private user: User;
  private users: User[];

  constructor(private service: BlogService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  login(email: string, password: string): void {
    if(email === "swpp@snu.ac.kr" &&
      password === "iluvswpp") {
      let user = this.getUserByEmail(email);
      this.service.setSignInedUser(user);
      user.signed_in = true;
      this.service.updateUser(user);
      this.router.navigate(['/articles']);
    } else {
      window.alert("email: "+email + "password: "+password);
      window.alert("Wrong account");
    }
  }

  getUsers(): void {
    this.service.getUsers()
      .then(users => this.users = users);
  }

  getUserByEmail(email: string): User {
    return this.users.find(item => item.email === email);
  }
}
