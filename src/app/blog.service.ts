import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { HttpModule } from "@angular/http";
import 'rxjs/add/operator/toPromise';

export class Article {
  public id: number;
  public author_id: number;
  public title: string;
  public content: string;
/*  constructor(public id: number,
              public author_id: number,
              public title: string,
              public content: string) { }*/
}

export class Comment {
  public id: number;
  public author_id: number;
  public article_id: number;
  public content: string;
/*  constructor(public id: number,
              public author_id: number,
              public article_id,
              public content: string) { }*/
}

export class User {
  public id: number;
  public email: string;
  public password: string;
  public name: string;
  public signed_in: boolean;
/*  constructor(public id: number,
              public email: string,
              public password: string,
              public name: string,
              public signed_in: boolean) { }*/
}

@Injectable()
export class BlogService {
  private articlesUrl = 'api/articles';
  private userUrl = 'api/user';
  private commentUrl = 'api/comments';
  private headers = new Headers({'Content-Type': 'application/json'});
  public signedInUser: User = null;

  constructor(private http: Http) { }

  getArticles() : Promise<Article[]> {
    return this.http.get(this.articlesUrl)
      .toPromise()
      .then(response => response.json().data as Article[])
      .catch(this.handleError);
  }

  getArticle(id: number): Promise<Article> {
    const url =`${this.articlesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Article)
      .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.userUrl)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  /*  getUserByEmail(email: string): Promise<User> {
      const url=`${this.userUrl}/${email}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as User)
        .catch(this.handleError);
    }*/
  // getUserNameById(id: number): Promise<string> {
  //   const url = `${this.userUrl}/${id}`;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response.json().data as string)
  //     .catch(this.handleError);
  //
  //   // string이 아니라 User를 리턴해야? 체크
  // }

  getComments(): Promise<Comment[]> {
    return this.http.get(this.commentUrl)
      .toPromise()
      .then(response => response.json().data as Comment[])
      .catch(this.handleError);
  }

  /*  getComment(id: number): Promise<Comment> {
      const url=`${this.commentUrl}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Comment)
        .catch(this.handleError);
    }*/

  createArticle(author_id: number, title: string, content: string): Promise<Article> {
    return this.http
      .post(this.articlesUrl, JSON.stringify({author_id: author_id, title: title, content: content}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Article)
      .catch(this.handleError);
  }

  updateArticle(article: Article): Promise<Article> {
    const url = `${this.articlesUrl}/${article.id}`;
    return this.http
      .put(url, JSON.stringify(article), {headers: this.headers})
      .toPromise()
      .then(() => article)
      .catch(this.handleError);
  }

  deleteArticle(id: number): Promise<void> {
    let url = `${this.articlesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  createComment(author_id: number, article_id: number, content: string): Promise<Comment> {
    return this.http
      .post(this.commentUrl, JSON.stringify({author_id: author_id, article_id: article_id, content: content}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Comment)
      .catch(this.handleError);
  }

  updateComment(comment: Comment): Promise<Comment> {
    const url = `${this.commentUrl}/${comment.id}`;
    return this.http
      .put(url, JSON.stringify(comment), {headers: this.headers})
      .toPromise()
      .then(() => comment)
      .catch(this.handleError);
  }

  deleteComment(id: number): Promise<void> {
    let url = `${this.commentUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


/*  delete(urlKind: string, id: number): Promise<void> {
    let url: string  = "";
    if (urlKind === "article") {
      url = `${this.articlesUrl}/${id}`;
    }
    else if (urlKind === "comment") {
      url = `${this.commentUrl}/${id}`;
    }

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }*/

  updateUser(user: User): Promise<User> {
    const url = `${this.userUrl}/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  getSignInedUser(): User {
    return this.signedInUser;
  }

  isSignedIn(): boolean {
    return this.signedInUser !== null;

  }

  setSignInedUser(user: User): void {
    this.signedInUser = user
  }

  signOut(): void {
    let user = this.signedInUser;
    console.log("in signOut function: ", user.signed_in);
    user.signed_in = false;
    this.updateUser(user);
    this.signedInUser = null;
  }

/*  checkUserSignIn(id: number): Promise<boolean> {
    const url = `${this.userUrl}/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json().data as User)
      .then(user => user.signed_in)
      .catch(this.handleError);
  }*/

  private handleError(error: any): Promise<any> {
    console.log('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
