import {TestBed, async, ComponentFixture, inject, tick} from '@angular/core/testing';
import {AppModule} from "./app.module";
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';
import {BlogService, User} from "./blog.service";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

class MockBlogService {
    signInedUser: User;
    isSIgnIned = this.signInedUser !== null;

    getSignInedUser() {

    }

    signOut() {

    }
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                RouterTestingModule
            ],
            declarations: [
                // User,
            ],
            providers: [
                {provide: BlogService, useClass: MockBlogService}
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
        it('should call getSignInedUser in BlogService',
            inject([BlogService], (service) => {
                const serviceSpy = spyOn(service, 'getSignInedUser');
                comp.ngOnInit();
                expect(serviceSpy).toHaveBeenCalled();
            }));

        it('should assign value to isSignIned',
            inject([BlogService], () => {
                const toAssign = comp.signInedUser !== null;
                comp.ngOnInit();
                expect(comp.isSignIned).toEqual(toAssign);
            }));

    });

    describe('when signOut', () => {
        it('should call signOut in BlogService',
            inject(
                [BlogService], (service: BlogService) => {
                    const serviceSpy = spyOn(service, 'signOut');
                    comp.signOut();
                    expect(serviceSpy).toHaveBeenCalled();
                }));

        it('should navigate to [/sign_in]',
            inject([Router], (router) => {
                const routerSpy = spyOn(router, 'navigate');
                comp.signOut();
                expect(routerSpy).toHaveBeenCalledWith(['/sign_in']);
            }));
    });
});





