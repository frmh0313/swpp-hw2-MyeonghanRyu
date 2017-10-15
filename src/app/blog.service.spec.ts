import {async, inject, TestBed} from "@angular/core/testing";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {HttpModule, Http, XHRBackend, Response, ResponseOptions, RequestMethod} from "@angular/http";

import {Article, Comment, User} from "./blog.service";
import {BlogService} from "./blog.service";
import {ARTICLES, COMMENTS, USER} from "./in-memory-data.service";

const makeArticleData = () => ARTICLES as Article[];
const makeCommentData = () => COMMENTS as Comment[];
const makeUserData = () => USER as User[];

describe('BlogService (mockBackend)', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BlogService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([BlogService], (service: BlogService) => {
      expect(service instanceof BlogService).toBe(true);
    }));

  it('can instantiate service with "new"',
    inject([Http], (http: Http) => {
      expect(http).not.toBeNull('http should be provided');
      let service = new BlogService(http);
      expect(service instanceof BlogService).toBe(true, 'new service should be ok');
    }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when getArticles', () => {
    let backend: MockBackend;
    let service: BlogService;
    let fakeArticles: Article[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new BlogService(http);
      fakeArticles = makeArticleData();
      let options = new ResponseOptions({status: 200, body: {data: fakeArticles}});
      response = new Response(options);
    }));

    it('should have expected fake articles (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
      service.getArticles()
        .then(articles => {
          // console.log(articles);
          expect(articles.length).toBe(fakeArticles.length,
            'should have expected no. of articles');
        });
    })));

    it('should be OK returning no articles', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
      service.getArticles()
        .then(articles => {
          expect(articles.length).toBe(0, 'should have no articles');
        })
    })));

    it('errors should be catched by this.handleError', () =>
      inject([BlogService], (service) => {
        const spy = spyOn(service, 'handleError');
        service.getArticles()
          .do(articles => {
            fail('any error')
          })
          .catch(err => {
            expect(spy).toHaveBeenCalledWith(err);
          });
      }));
  });

  describe('when getUsers', () => {
    let backend: MockBackend;
    let service: BlogService;
    let fakeUsers: User[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new BlogService(http);
      fakeUsers = makeUserData();
      let options = new ResponseOptions({status: 200, body: {data: fakeUsers}});
      response = new Response(options);
    }));

    it('should have expected fake users (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
      service.getUsers()
        .then(users => {
          expect(users.length).toBe(fakeUsers.length, 'should have expected no. of users');
        });
    })));

    it('should be OK returning no users', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
      service.getUsers()
        .then(users => {
          expect(users.length).toBe(0, 'should have no users');
        })
    })));

    it('errors should be catched by this.handleError', () =>
      inject([BlogService], (service) => {
        const spy = spyOn(service, 'handleError');
        service.getUsers()
          .do(users => {
            fail('any error')
          })
          .catch(err => {
            expect(spy).toHaveBeenCalledWith(err);
          });
      }));
  });
  describe('when getComments', () => {
    let backend: MockBackend;
    let service: BlogService;
    let fakeComments: Comment[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new BlogService(http);
      fakeComments = makeCommentData();
      let options = new ResponseOptions({status: 200, body: {data: fakeComments}});
      response = new Response(options);
    }));

    it('should have expected fake comments (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
      service.getComments()
        .then(comments => {
          expect(comments.length).toBe(fakeComments.length, 'should have expected no. of comments');
        });
    })));

    it('should be OK returning no comments', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
      service.getUsers()
        .then(comments => {
          expect(comments.length).toBe(0, 'should have no comments');
        })
    })));

    it('errors should be catched by this.handleError',
      inject([BlogService], (service) => {
        const spy = spyOn(service, 'handleError');
        service.getUsers()
          .do(users => {
            fail('any error')
          })
          .catch(err => {
            expect(spy).toHaveBeenCalledWith(err);
          });
      }));
  });

  describe('when getArticle with id', () => {
    let backend: MockBackend;
    let service: BlogService;
    let fakeArticles: Article[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new BlogService(http);
      fakeArticles = makeArticleData();
      let options = new ResponseOptions({status: 200, body: {data: fakeArticles}});
      response = new Response(options);
    }));

    it('should have expected article', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
      service.getArticle(0)
        .then(article => {
          expect(article[0].id == fakeArticles[0].id).toBe(true);
        });

      for (let i = 1; i < 11; i++) {
        service.getArticle(i + 10)
          .then(article => {
            expect(article[i].id == fakeArticles[i].id).toBe(true);
          });
      }
    })));

    it('should OK returning no article', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: null}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
      service.getArticle(15)
        .then(article => {
          expect(article).toBe(null)
        });
    })));

    it('errors should be catched by this.handleError',
      inject([BlogService], (service) => {
        const spy = spyOn(service, 'handleError');
        service.getArticle(0)
          .do(article => {
            fail('any error')
          })
          .catch(err => {
            expect(spy).toHaveBeenCalledWith(err);
          });
      }));
  });

  describe('when getUser with id', () => {
    let backend: MockBackend;
    let service: BlogService;
    let fakeUsers: User[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new BlogService(http);
      fakeUsers = makeUserData();
      let options = new ResponseOptions({status: 200, body: {data: fakeUsers}});
      response = new Response(options);
    }));

    it('should have expected user', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      for (let i = 1; i <= 3; i++) {
        service.getUser(i)
          .then(user => {
            console.log("user[i-1]: ", user[i - 1]);
            console.log("user[i]: ", user[i]);
            expect(user[i - 1].id == fakeUsers[i - 1].id).toBe(true);
          });
      }
    })));

    it('should OK returning no user', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: null}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
      service.getUser(5)
        .then(user => {
          expect(user).toBe(null);
        });
    })));

    it('errors should be catched by this.handleError',
      inject([BlogService], (service) => {
        const spy = spyOn(service, 'handleError');
        service.getUser(1)
          .do(user => {
            fail('any error')
          })
          .catch(err => {
            expect(spy).toHaveBeenCalledWith(err);
          });
      }));
  });

  describe('when create', () => {
    let backend: MockBackend;
    let service: BlogService;
    let newArticle: Article;
    let newComment: Comment;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new BlogService(http);
      newArticle = Object.assign({}, {id: 35},
        {author_id: 111, title: 'title', content: ' content'}) as Article;
      newComment = Object.assign({}, {id: 30},
        {article_id: 11, author_id: 111, content: 'content'}) as Comment;

    }));

    it('createArticle should throw post request', async () => {
      backend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Post);
      });
      // service.createArticle.apply(this, newArticle);
      service.createArticle(newArticle['author_id'], newArticle['title'], newArticle['content']);
    });

    it('createArticle should return created article', async() =>{
      const resp = new Response(new ResponseOptions({status: 200, body: {data: newArticle}}));
      backend.connections.subscribe(connection => {
        connection.mockRespond(resp);
      });
      service.createArticle(newArticle.author_id, newArticle.title, newArticle.content);
    });

    it('createComment should throw post request', async () => {
      backend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Post);
      });
      service.createComment(111, 111, 'content');
      // service.createComment.apply(this, newComment);
    });

    it('createComment should return created comment', async () => {
      const resp = new Response(new ResponseOptions({status: 200, body: {data: newComment}}));
      backend.connections.subscribe(connection => {
        connection.mockRespond(resp);
      });

      service.createComment(newComment.author_id, newComment.article_id, newComment.content)
        .then(res => {
          expect(res).toEqual(newComment);
        })
    })
  });

  describe('when delete', () => {
    let backend: MockBackend;
    let service: BlogService;
    let updatedUser: User;
    let updatedArticle: Article;

    /*    let fakeArticles: Article[];
        let response: Response;*/

    /*    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
          backend = be;
          service = new BlogService(http);
          fakeArticles = makeArticleData();
          // console.log(fakeArticles);
          fakeArticles.splice(0, 1); // with deletion of array having id 0.
          // console.log("after splicing: ", fakeArticles);

          let options = new ResponseOptions({status: 200, body: {data: fakeArticles}});
          response = new Response(options);
        }));*/

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new BlogService(http);
    }));

    it('deleteArticle should throw delete request', async () => {
      backend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Delete);
      });
      service.deleteArticle(1);
    });

    it('deleteComment should throw delete request', async () => {
      backend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Delete);
      });
      service.deleteComment(1);
    });
    /* /!*      it('should return void', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            service.deleteArticle(0)
              .then(result => {
                console.log(result);
                expect(result).toBeNull();
              });
          })));*!/

          it('should have articles without deleted ones', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
    /!*        console.log(fakeArticles);
            service.deleteArticle(11)
              .then(ret => {
                console.log(fakeArticles);
              })*!/
            service.deleteArticle(0)
              .then(ret => {
                console.log(fakeArticles);
                service.getArticles()
                  .then(articles => articles === fakeArticles)
              })
          })));

    /!*
          it('should be ok when no articles', async(inject([], () => {
            let resp = new response(new responseoptions({status: 200, body:{ data: []}}));
            backend.connections.subscribe((c: mockconnection) => c.mockrespond())
          })))

    *!/!*/
  });


  describe('when update', () => {
    let backend: MockBackend;
    let service: BlogService;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new BlogService(http);
    }));

    it('updateUser should throw put request', async () => {
      backend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Put)
      });
      service.updateUser({id: 1, email: 'testing', password: 'testing', name: 'testing', signed_in: false} as User)
    });

    it('updateUser should return updatedUser', async() => {
    })

    it('updateArticle should throw put request', async () => {
      backend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Put)
      });
      service.updateArticle({id: 111, author_id: 11, title: 'title', content: 'content'} as Article);
    });

    it('update Comment should throw put request', async () => {
      backend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Put)
      });
      service.updateComment({id: 111, article_id: 111, author_id: 111, content: 'string'} as Comment);
    });
  });


  describe('when getSignInedUser', () => {
    it('should return User type value',
      inject([BlogService], (service) => {
        expect(service.getSignInedUser()).toEqual(jasmine.any(User));
      }))
  });

  describe('when isSignedIn', () => {
    it('should return boolean value', inject(
      // it('should return boolean value', () => inject(
      [BlogService], (service) => {
        expect(service.isSignedIn() === true || service.isSignedIn() === false).toBe(true);
      }
    ));
  });

  describe('when setSignInedUser', () => {
    // it('should assign user to signedInUser', () => inject(
    it('should assign user to signedInUser',
      inject([BlogService], (service) => {
          let fakeuser = {id: 99, email: 'fake@testing', password: 'fake', name: 'faker', signed_in: true};
          service.setSignInedUser(fakeuser);
          expect(service.signedInUser.id === fakeuser.id);
        }
      ))
  });

  describe('when signOut', () => {
    let fakeuser = {id: 99, email: 'fake@testing', password: 'fake', name: 'faker', signed_in: true};
    it('should empty the signedInUser',
      inject([BlogService], (service) => {
          service.signInedUser = fakeuser;
          console.log(service.signInedUser);
          service.signOut();
          console.log('after signOut', service.signInedUser);
          expect(service.signInedUser).toBeNull();
        }
      ));

    it('should call updateUser in BlogService',
      inject([BlogService], (service) => {
        const spy = spyOn(service, 'updateUser');
        service.signInedUser = fakeuser;
        service.signOut();
        expect(spy).toHaveBeenCalled();
      }));
  });


  describe('when handleError',
    inject([BlogService], (service) => {
      it('returns reject', () => {
        let fakeerror: Error = Error('fake');
        expect(service.handleError(fakeerror)).toEqual(Promise.reject(fakeerror.message || fakeerror));
      });
    }));
});


