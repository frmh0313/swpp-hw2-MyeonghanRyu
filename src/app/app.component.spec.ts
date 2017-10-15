/*
import {TestBed, async, ComponentFixture, inject, tick} from '@angular/core/testing';
import { AppModule } from "./app.module";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import {BlogService, User} from "./blog.service";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

class MockBlogService {
  signInedUser: User;
  isSIgnIned = this.signInedUser !== null;

}

describe('AppComponent', () => {
  /!*
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
  *!/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule,
        RouterTestingModule],
      declarations: [
        // User,
      ],
      providers: [
        {provide: BlogService, userClass: MockBlogService }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
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

  describe('when ngOnInit', () => {
    beforeEach(async(() => {
      comp = fixture.componentInstance;
    }));
  });
  it('should call getSignInedUser in BlogService',
    inject([BlogService], (service) => {
      const serviceSpy = spyOn(service, 'getSignInedUser');
      comp.ngOnInit();
      tick();
      expect(serviceSpy).toHaveBeenCalled();
    }));

  it('should assign value to isSignIned',
    inject([BlogService], () => {
      const toAssign = comp.signInedUser !== null;
      comp.ngOnInit();
      tick();
      expect(comp.isSignIned).toEqual(toAssign);
    }));
});

describe('when signOut', () => {
  it('should call signOut in BlogService',
    inject(
      [BlogService], (service: BlogService) => {
        const serviceSpy = spyOn(service, 'signOut');
        comp.ngOnInit();
        tick();
        expect(serviceSpy).toHaveBeenCalled();
      }));

  it('should navigate to [/sign_in]',
    inject([Router], (router) => {
        const routerSpy = spyOn(router, 'navigate');
        comp.ngOnInit();
        tick();
        expect(routerSpy).toHaveBeenCalledWith('/sign_in')
      }));
});

/!*  describe('when ngOnInit', () => {
    it('should call getSignInedUsed in BlogService', inject([BlogService], (service) => {
      const serviceSpy = spyOn(service, 'getSignInedUser');
    comp.ngOnInit();
    expect(serviceSpy).toHaveBeenCalled();
    }));

    it('should assign this.isSigned', () => {

    })
    }))
  });*!/


*/
