import {TestBed, async, ComponentFixture, inject} from "@angular/core/testing";
import {AuthGuard} from "./auth-guard.service";
import {BlogService} from "./blog.service";
import createSpy = jasmine.createSpy;
import {RouterTestingModule} from "@angular/router/testing";

let comp: AuthGuard;
let fixture: ComponentFixture<AuthGuard>;

class MockBlogService {

}

describe('AuthGuard', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AuthGuard],
      providers: [ AuthGuard,
        {provide: BlogService, userClass: MockBlogService}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AuthGuard);
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

  describe('canActivate', () => {
    it('should call this.isSignedIn', () => {
      comp.isSignedIn = createSpy('isSignedIn');
      expect(comp.isSignedIn).toHaveBeenCalled();
    });
  });

  describe('isSignedIn', () => {
    it('should call isSignedIn in BlogService', () => inject(
      [BlogService], (service) => {

      }));
    it('should return boolean value', () => {

    });
  });
});
