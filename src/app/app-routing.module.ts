import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";

import { ArticleListComponent } from "./article/article-list.component";
import { ArticleDetailComponent } from "./article/article-detail.component";
import { ArticleCreateComponent } from "./article/article-create.component";
import { ArticleEditComponent } from "./article/article-edit.component";
import {SignInComponent} from "./sign-in.component";
import {PageNotFoundComponent} from "./not-found.component";
import {CommentEditComponent} from "./comment/comment-edit.component";
import {AuthGuard} from "./auth-guard.service";

const routes: Routes = [
  { path: 'sign_in', component: SignInComponent },
  { path: 'articles',
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: ArticleCreateComponent },
      { path: ':id/edit', component: ArticleEditComponent },
      { path: ':id', component: ArticleDetailComponent},
      { path: '', component: ArticleListComponent }
    ]
  },
  { path: 'comments/:id/edit', component: CommentEditComponent },
  { path: '', redirectTo: '/sign_in', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
