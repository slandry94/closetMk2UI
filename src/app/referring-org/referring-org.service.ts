import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ReferringOrg } from './referring-org.component';
@Injectable()
export class ReferringOrgService {
  apiUrlBase = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  public find(org: string, program: string) {
    let params = new HttpParams();
    params.append('organization', org);
    params.append('program', program);
    return this.http.get(this.apiUrlBase + 'refOrg', {
      params: {
      'organization': org,
      'program': program
    },
    observe: 'response'}).map(
      (res: HttpResponse<any>) => {
        return res.body;
      }
    );
  }
  public update(refOrg: ReferringOrg) {
    const head = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.patch(this.apiUrlBase + 'refOrg/update', JSON.stringify(refOrg), {headers: head}).map(
      (res: Response) => {
        console.log(res);
        return res;
      }
    );
  }
  public create(refOrg: ReferringOrg) {

  }
}
