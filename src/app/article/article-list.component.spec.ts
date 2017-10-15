import {TestBed, async, ComponentFixture, inject} from "@angular/core/testing";
import {ArticleListComponent} from "./article-list.component";
import {Article, BlogService} from "../blog.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {ARTICLES, USER} from "../in-memory-data.service";
import createSpy = jasmine.createSpy;

let comp: ArticleListComponent;
let fixture: ComponentFixture<ArticleListComponent>;

class MockBlogService {
  getUsers() {
    return new Promise((resolve, reject) => resolve(USER));
  }

  getArticles() {

  }
}

describe('ArticleListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ArticleListComponent],
      providers: [
        {provide: BlogService, useClass: MockBlogService}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ArticleListComponent);
        comp = fixture.componentInstance;
      });
  }));

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('ngOnInit', () => {
    it('should call getArticles()', () => {
      comp.getUsers = createSpy('getUsers')
      comp.getArticles = createSpy('getArticles')
      comp.ngOnInit();
      expect(comp.getArticles).toHaveBeenCalled();
    });

    it('should call getUsers()', () => {
      comp.getUsers = createSpy('getUsers')
      comp.getArticles = createSpy('getArticles')
      comp.ngOnInit();
      expect(comp.getUsers).toHaveBeenCalled();
    });

  });

  describe('getArticles', () => {
    it('should call getArticles() in BlogService',
      inject([BlogService], (service) => {
        const serviceSpy = spyOn(service, 'getArticles')
          .and.returnValue(new Promise((resolve, reject) => {
            resolve(ARTICLES)
          }));
        comp.getArticles();
        expect(serviceSpy).toHaveBeenCalled()
      }));
  });

  describe('getUsers', () => {
    it('should call getUsers() in BlogService',
      inject([BlogService], (service) => {
        // const serviceSpy = spyOn(service, 'getUsers');
        comp.getUsers();
        service.getUsers()
          .then(users => {
            expect(users).toEqual(USER)
          });
      }))

    /*
    it('should call getUsers() in BlogService',
      inject([BlogService], (service) => {
      const serviceSpy = spyOn(service, 'getUsers');
      comp.getUsers();
      expect(service.getUsers()).toHaveBeenCalledWith().
      }))
      */

  });

  describe('getUsersNameById', () => {
    it('should call return user name with the parameter id', () => {
      comp.users = USER;
      const userName = comp.getUserNameById(1);
      expect(userName).toBe('Software Lover');
    });
  });

  describe('gotoArticle', () => {
    it(`should navigate to ['/articles']`,
      inject([Router], (router) => {
        const routerSpy = spyOn(router, 'navigate');
        comp.articles = ARTICLES;
        comp.gotoArticle(comp.articles[0]);
        expect(routerSpy).toHaveBeenCalled()
      }))

  });


  describe('create', () => {
    it(`should navigate to ['articles/create']`,
      inject([Router], (router) => {
        const routerSpy = spyOn(router, 'navigate');

        comp.create();

        expect(routerSpy).toHaveBeenCalledWith(['articles/create']);
      }))
  });
});
