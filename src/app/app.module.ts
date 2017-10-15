import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';

import {ArticleListComponent} from "./article/article-list.component";
import {ArticleDetailComponent} from "./article/article-detail.component";
import {ArticlePreviewComponent} from "./article/article-preview.component";
import {ArticleCreateComponent} from "./article/article-create.component";
import {ArticleEditComponent} from "./article/article-edit.component";

import {CommentListComponent} from "./comment/comment-list.component";
import {CommentDetailComponent} from "./comment/comment-detail.component";
import {CommentCreateComponent} from "./comment/comment-create.component";
import {CommentEditComponent} from "./comment/comment-edit.component";
import {CommentDisplayComponent} from "./comment/comment-display.component";

import {SignInComponent} from "./sign-in.component";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {BlogService} from "./blog.service";
import {PageNotFoundComponent} from "./not-found.component";
import {AuthGuard} from "./auth-guard.service";
import {APP_BASE_HREF} from "@angular/common";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
    ArticlePreviewComponent,
    SignInComponent,
    CommentCreateComponent,
    CommentEditComponent,
    CommentDisplayComponent,
    CommentListComponent,
    CommentDetailComponent,
    PageNotFoundComponent
  ],
  providers: [
    BlogService,
    AuthGuard,
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
