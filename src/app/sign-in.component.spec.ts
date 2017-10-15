/*
import {TestBed, async, ComponentFixture, inject} from "@angular/core/testing";
import {BlogService} from "./blog.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import createSpy = jasmine.createSpy;
import {SignInComponent} from "./sign-in.component";

let comp: SignInComponent;
let fixture: ComponentFixture<SignInComponent>;

class MockBlogService {
  getUsers() {

  }

}
// TODO: inject넣을 때 () => { inject로 넣는 것과 바로 inject로 넣는 것의 차이?
describe('SignInComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SignInComponent],
      providers: [
        {provide: BlogService, userClass: MockBlogService}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SignInComponent);
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
    it('should call getUsers() in the component', () => {
      comp.getUsers = createSpy('getUsers');
      comp.ngOnInit();
      expect(comp.getUsers).toHaveBeenCalled();
    });
  });

  // TODO: common issue. 이게 안 되는 이유?
  describe('getUsers', () => {
    it('should call getUsers in BlogService',
      inject([BlogService], (service) => {
      let serviceSpy = spyOn(service, 'getUsers');
      comp.getUsers();
      expect(serviceSpy).toHaveBeenCalled();
      }));
    });

  // TODO: signInComponent.getUserByEmail -- BlogService spy issue
  describe('getUserByEmail', () => {
    it ('should call getusers in BlogService',
      inject([BlogService], (service) => {

      }
    ))
  });

  // TODO: signInComponent.login
  describe('login', () => {
    describe('if email === "swpp@snu.ac.kr" && password ==="iluvswpp"', () => {

      it('should call this.getUserByEmail')

      it('should call setsignInedUser in BlogService')

      it('should call updateUser in BlogService')

      it('should navigate to ["/articles"]')
    });

    describe('else', () => {
      it('should call window.alert')
    });
  });

});
*/
