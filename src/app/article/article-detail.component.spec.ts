import {TestBed, async, ComponentFixture, inject, tick, fakeAsync} from "@angular/core/testing";
import {ArticleDetailComponent} from "./article-detail.component";
import {BlogService, Article, User, Comment} from "../blog.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {CommentListComponent} from "../comment/comment-list.component";
import {CommentDetailComponent} from "../comment/comment-detail.component";
import {CommentEditComponent} from "../comment/comment-edit.component";
import {CommentDisplayComponent} from "../comment/comment-display.component";
import {CommentCreateComponent} from "../comment/comment-create.component";
import {ARTICLES, COMMENTS, USER} from "../in-memory-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import createSpy = jasmine.createSpy;
import {Component, Input} from "@angular/core";

let comp: ArticleDetailComponent;
let fixture: ComponentFixture<ArticleDetailComponent>;

class MockBlogService {
    getArticle() {
    }

    getUser() {

    }

    getComments() {

    }

    deleteArticle() {

    }

    getSignInedUser() {

    }
}

@Component({
    selector: 'comments',
    template: ''
})
class MockCommentComponent {
    @Input() articleId;
}

describe('ArticleDetailComponent', () => {
    let getCommentsSpy;
    let getArticleSpy;
    let deleteArticleSpy;
    let getSignInedUserSpy;
    let getUserSpy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule
            ],
            declarations: [
                ArticleDetailComponent,
                MockCommentComponent
            ],
            providers: [
                {provide: BlogService, useClass: MockBlogService}
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ArticleDetailComponent);
                comp = fixture.componentInstance;
            });
    }));

    beforeEach(async(inject([BlogService], (service) => {
        getCommentsSpy = spyOn(service, 'getComments')
            .and.returnValue(Promise.resolve(COMMENTS));

        getArticleSpy = spyOn(service, 'getArticle')
            .and.returnValue(Promise.resolve(ARTICLES[0]));

        getUserSpy = spyOn(service, 'getUser')
            .and.returnValue(Promise.resolve(USER[0]));

        deleteArticleSpy = spyOn(service, 'deleteArticle')
            .and.returnValue(Promise.resolve(null));

        getSignInedUserSpy = spyOn(service, 'getSignInedUser')
            .and.returnValue(Promise.resolve(USER[0]));
    })));

    it('can instantiate it', () => {
        expect(comp).not.toBeNull();
    });

    it('should create the app', async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    // TODO: DOM element testing?
    /*  describe('user verification', () => {
        it(`should display edit button and delete button only if ' +
          'BlogService.getSignInedUser().id == article.author_id`, () =>
        inject([BlogService], (service) => {

        })
      });*/

    // describe('ngOnInit()', () => {
    //     it('should call getComments in BlogService', async(() => {
    //         comp.ngOnInit();
    //         expect(getCommentsSpy).toHaveBeenCalled();
    //     }));
    //
    //     it('should make an article not to be null',
    //         async(() => {
    //             comp.ngOnInit();
    //             expect(comp.article).not.toBeNull();
    //         }));
    //
    //     it('should call getAuthor',
    //         async(() => {
    //             comp.getAuthor = createSpy('getAuthor');
    //             comp.ngOnInit();
    //             fixture.detectChanges();
    //             expect(comp.getAuthor).toHaveBeenCalledWith(comp.article);
    //         }));
    // });

    // xdescribe('ngOnInit()', () => {
    //     it('should call getComments in BlogService',
    //         inject([BlogService], (service) => {
    //             // const serviceSpy = spyOn(service, 'getComments')
    //             //   .and.returnValue(new Promise((resolve, reject) => {
    //             //     resolve({data: ''})
    //             //   }));
    //             comp.ngOnInit();
    //             // expect(serviceSpy).toHaveBeenCalled();
    //         }));
    //
    //     /*    it('should assign article value to this.article',
    //           inject([ActivatedRoute], (route) => {
    //             comp.ngOnInit();
    //             comp.article = createSpy('article');
    //             expect(comp.article).not.toBeNull();
    //           }));*/
    // });
    //
    // describe('getAuthor()', () => {
    //     it('should call getUser(id) in BlogService',
    //         inject([BlogService], (service: MockBlogService) => {
    //             console.log(service);
    //             // const serviceSpy = spyOn(service, 'getUser')
    //             //   .and.returnValue(new Promise((resolve, reject) => {
    //             //     resolve()
    //             //   }));
    //             comp.getAuthor(0);
    //             expect(getUserSpy).toHaveBeenCalledWith(0);
    //         }))
    // });
    //
    // describe('getAuthorName()', async () => {
    //     it('should return string type value',
    //         inject([BlogService], () => {
    //             comp.ngOnInit();
    //             fixture.detectChanges();
    //
    //             fixture.whenStable()
    //                 .then(() => {
    //                     const authorName = comp.getAuthorName();
    //                     expect(authorName).toEqual(USER[0].name);
    //                 })
    //         }));
    // });
    //
    // xdescribe('getComments()', () => {
    //     it('should call getComments() in BlogService',
    //         inject([BlogService], (service) => {
    //             const serviceSpy = spyOn(service, 'getComments')
    //                 .and.returnValue((resolve, rejct) => {
    //                     resolve(COMMENTS)
    //                 });
    //             comp.getComments();
    //             expect(serviceSpy).toHaveBeenCalled();
    //         }));
    // });
    //
    // describe('edit()', () => {
    //     it(`should navigate to ['articles/id/edit']`,
    //         fakeAsync(inject([Router, BlogService], (router) => {
    //             const routerSpy = spyOn(router, 'navigate');
    //             comp.ngOnInit();
    //             tick();
    //             comp.edit();
    //             expect(routerSpy).toHaveBeenCalledWith(['/articles', comp.article.id, 'edit']);
    //         })));
    // });
    //
    // describe('delete()', () => {
    //     it('should call deleteArticle in BlogService',
    //         async(() => {
    //             comp.ngOnInit();
    //             fixture.detectChanges();
    //             fixture.whenStable()
    //                 .then(() => {
    //                 fixture.detectChanges()
    //                     comp.delete();
    //                     expect(deleteArticleSpy).toHaveBeenCalledWith("articles", this.article.id);
    //                 })
    //         }));
    //
    //     it('should call back() function in it',
    //         async(inject([BlogService], (service) => {
    //             comp.ngOnInit();
    //             comp.delete();
    //             service.delete("article", this.article.id)
    //                 .then(() =>
    //                     expect(comp.back()).toHaveBeenCalled());
    //         })));
    // });
    //
    //
    // xdescribe('back()', () => {
    //     it(`should navigate to ['articles']`,
    //         inject([Router], (router) => {
    //             const routerSpy = spyOn(router, 'navigate');
    //             comp.back();
    //             expect(routerSpy).toHaveBeenCalledWith(['articles']);
    //         }));
    //
    // });
});

