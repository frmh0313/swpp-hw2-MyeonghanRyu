/*
import {TestBed, async, ComponentFixture, inject } from "@angular/core/testing";
import { CommentListComponent } from "./comment-list.component";
import { BlogService, Comment } from "../blog.service";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import {COMMENTS, InMemoryDataService, USER} from "../in-memory-data.service";
import createSpy = jasmine.createSpy;
import {CommentDetailComponent} from "./comment-detail.component";
import {CommentDisplayComponent} from "./comment-display.component";
import {CommentEditComponent} from "./comment-edit.component";
import {CommentCreateComponent} from "./comment-create.component";
import {FormsModule} from "@angular/forms";

let comp: CommentListComponent;
let fixture: ComponentFixture<CommentListComponent>;

class MockBlogService {
  getUsers() {

  }

  getComments() {

  }
}

describe('CommentListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule
      ],
      declarations: [CommentListComponent,
        CommentDetailComponent,
        CommentDisplayComponent,
        CommentEditComponent,
        CommentCreateComponent
      ]
      ,
      providers: [
        {provide: BlogService, useClass: MockBlogService}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CommentListComponent);
        comp = fixture.componentInstance;
      });
  }));

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

  it('should  create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('ngOnInit', () => {
    it('should call getComments()', () => {
      comp.getUsers = createSpy('getUsers');
      comp.getComments = createSpy('getComments');
      comp.ngOnInit();
      expect(comp.getComments).toHaveBeenCalled();
    });

    it('should call getUsers()', () => {
      comp.getUsers = createSpy('getUsers');
      comp.getComments = createSpy('getComments');
      comp.ngOnInit();
      expect(comp.getComments).toHaveBeenCalled();
    });
  });

  describe('getComments', () => {
    it('should call getComments() in BlogService',
      inject([BlogService], (service) => {
        const serviceSpy = spyOn(service, 'getComments')
          .and.returnValue(new Promise((resolve, reject) => {
            resolve(COMMENTS)
          }));
        comp.getComments();
        expect(serviceSpy).toHaveBeenCalled()
      }));

    it('should call getUsers() in BlogService',
      inject([BlogService], (service) => {
        const serviceSpy = spyOn(service, 'getUsers')
          .and.returnValue(new Promise((resolve, reject) => {
            resolve(USER)
          }));
        comp.getUsers();
        expect(serviceSpy).toHaveBeenCalled();
      }));
  });

  describe('getUserNameById', () => {
    it('should find user name using Id',
      inject([BlogService], (service) => {
        comp.users = service.makeUserData();
        expect(comp.getUserNameById(1)).toEqual('Software Lover');
        expect(comp.getUserNameById(2)).toEqual('Alan Turing');
        expect(comp.getUserNameById(3)).toEqual('Edsger Dijkstra');
      }));

    it('finds item using id',
      inject([BlogService], (service) => {
        comp.users = service.makeUserData();
      }));
  });

  describe('delete', () => {
    it('should call deleteComment in BlogService',
      inject([BlogService], (service) => {
        const serviceSpy = spyOn(service, 'deleteComment')
          .and.returnValue(new Promise((resolve, reject) => {
            resolve()
          }));
        comp.delete(COMMENTS[0]);
        expect(serviceSpy).toHaveBeenCalled();
      }));
  });


  describe('onCreate', () => {
    it('should call push() of Comment[]', () => {
      comp.comments = [];
      const lenOfComments = comp.comments.length;
      comp.onCreate({id: 101, author_id: 101, content: 'Test', article_id: 101} as Comment);
      expect(comp.comments.length).toEqual(lenOfComments + 1);
    });
  });
});




*/
