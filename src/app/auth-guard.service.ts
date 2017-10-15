import { Injectable } from "@angular/core";
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot} from "@angular/router";
import {BlogService} from "./blog.service";
import {NgModule} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private service: BlogService,
              private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isSignedIn()

  }

  isSignedIn(): boolean {
    if (this.service.isSignedIn()) {
      return true;
    }
    window.alert("잘못된 접근입니다.");
    this.router.navigate(['/sign_in']);
    return false;
  }
}
