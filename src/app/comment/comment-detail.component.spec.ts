import {TestBed, async, ComponentFixture, inject} from "@angular/core/testing";
import {CommentDetailComponent} from "./comment-detail.component";
import {BlogService, Comment, User} from "../blog.service";
import {COMMENTS, USER} from "../in-memory-data.service";
import {CommentDisplayComponent} from "./comment-display.component";
import {CommentEditComponent} from "./comment-edit.component";
import createSpy = jasmine.createSpy;
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

let comp: CommentDetailComponent;
let fixture: ComponentFixture<CommentDetailComponent>;

class MockBlogService {
    getUser(id: number) {
    }

    updateComment() {

    }
}

describe('CommentDetailComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule,
            ],
            declarations: [
                CommentDetailComponent,
                CommentDisplayComponent,
                CommentEditComponent
            ],
            providers: [
                {provide: BlogService, useClass: MockBlogService}
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(CommentDetailComponent);
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

    describe('ngOnInit()', () => {
        it('should call getUser()', () => {
            comp.getUser = createSpy('getUser');
            comp.ngOnInit();
            expect(comp.getUser).toHaveBeenCalled();
        });
    });
    // TODO: service에서 id를 이용해서 불러오는 경우.? argument 넘기는 건 어떻게 테스트
    // TODO: resolve에 뭘 넣어야??
    describe('getUser()', () => {
        it('should call getUser in BlogService',
            async(inject([BlogService], (service) => {
                console.log(service);
                const serviceSpy = spyOn(service, 'getUser')
                    .and.returnValue(new Promise((resolve, reject) => {
                        resolve()
                    }));
                comp.getUser();
                expect(serviceSpy).toHaveBeenCalled();
            })));
    });


    describe('edit()', () => {
        it('should change isEditMode value', () => {
            let initial = comp.isEditMode;
            comp.edit();
            expect(initial).toEqual(!comp.isEditMode);
        });
    });

    describe('save()', () => {
        it('should call updateComment in BlogService',
            inject([BlogService], (service) => {
                const serviceSpy = spyOn(service, 'updateComment')
                    .and.returnValue(new Promise((resolve, reject) => {
                        resolve()
                    }));
                comp.save();
                expect(serviceSpy).toHaveBeenCalled();
            }));

        it('should change isEditMode value',
            inject([BlogService], (service) => {
                let initial = comp.isEditMode;
                comp.save();
                expect(initial).toEqual(!comp.isEditMode);
            }));
    });

});
