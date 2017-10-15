import {TestBed, async, ComponentFixture, inject} from "@angular/core/testing";
import {BlogService} from "../blog.service";
import {Location, LocationStrategy} from "@angular/common";
import createSpy = jasmine.createSpy;
import {ArticleEditComponent} from "./article-edit.component";
import {FormsModule} from "@angular/forms";
import {AppModule} from "../app.module";
import { Article } from "../blog.service";
import { ArticlePreviewComponent } from "./article-preview.component";
import {ArticleDetailComponent} from "./article-detail.component";
import {CommentListComponent} from "../comment/comment-list.component";
import {CommentDetailComponent} from "../comment/comment-detail.component";
import {CommentCreateComponent} from "../comment/comment-create.component";
import {CommentDisplayComponent} from "../comment/comment-display.component";
import {CommentEditComponent} from "../comment/comment-edit.component";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {ARTICLES} from "../in-memory-data.service";


let comp: ArticleEditComponent;
let fixture: ComponentFixture<ArticleEditComponent>;

class MockBlogService {
  getArticle() {

  }

}

describe('ArticleEditComponent', () => {
  let getArticleSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        RouterTestingModule],
      declarations: [ArticleEditComponent,
        ArticlePreviewComponent,
      ],
      /*      ArticleDetailComponent,
            CommentListComponent,
            CommentDetailComponent,
            CommentCreateComponent,
            CommentDisplayComponent,
            CommentEditComponent],*/
      providers: [ Location,
        {provide: BlogService, useClass: MockBlogService}
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ArticleEditComponent);
        comp = fixture.componentInstance;
      });
  }));

  beforeEach(async(inject([BlogService], (service) => {
    getArticleSpy = spyOn(service, 'getArticle')
      .and.returnValue(Promise.resolve(ARTICLES[0]));
  })));

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('ngOnInit', () => {
    it('should call getArticle in BlogService', async(() => {
      inject([BlogService], (service) => {
        comp.ngOnInit();
        expect(getArticleSpy).toHaveBeenCalled();
      });
    }));

    it('should change this.article value', async(() => {
      inject([BlogService], (service) => {
        expect(comp.article).not.toBeNull();
      })
    }));
  });

  // TODO: ArticleEditComponent.goBack
  describe('goBack', () => {
    /*    it('should navigate to ["/articles", article.id]', inject(
          [BlogService, Router], (service: BlogService, router: Router) => {
            const routerSpy = spyOn(router, 'navigate');
            comp.goBack();
            expect(routerSpy).toHaveBeenCalled();
          }));*/
    it('should call location.back', async(() => {
      inject([Location], (location) => {
        let locationSpy = spyOn(location, 'back');
        comp.goBack();
        expect(locationSpy).toHaveBeenCalled();
      })}));

  });

  describe('save', () => {
    it('should call updateArticle in BlogService', )
  })

});

