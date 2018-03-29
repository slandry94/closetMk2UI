import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class LoginService {
  apiUrlBase = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  public attemptLogin(uname: string, pwd: string): Observable<any> {
    const head = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.patch(this.apiUrlBase + 'login', {username: uname, password: pwd}, {headers: head}).map(
      (res: Response) => {
        return res;
      }
    );
  }
}
