import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';
import {RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ReferringOrg } from './referring-org.component';
@Injectable()
export class ReferringOrgService {
  apiUrlBase = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  public find(org: string, program: string) {
    console.log(org + ',' + program);
    let params = new HttpParams();
    // params.append('organization', org);
    // params.append('program', program);
    return this.http.get(this.apiUrlBase + 'refOrg/' + org + '/' + program, {
      params: {
      'organization': org,
      'program': program
    },
    observe: 'response'}).map(
      (res: HttpResponse<any>) => {
        console.log(res.body);
        return res.body;
      }
    );
  }
  public get(): Observable<ReferringOrg[]> {
    const head = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.apiUrlBase + 'refOrg/', {headers: head}).map (
      (res: ReferringOrg[]) => {
        console.log(res);
        return res;
      }
    );
  }
  public update(refOrg: ReferringOrg, initOrg: string, initProg: string) {
    const head = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.patch(this.apiUrlBase + 'refOrg/update/' + initOrg + '/' + initProg,
    JSON.stringify(refOrg), {headers: head}).map(
      (res: Response) => {
        console.log(res);
        return res;
      }
    );
  }
  public create(refOrg: ReferringOrg) {

  }
  public delete(orgName: string, progLoc: string): Observable<HttpResponse<string>> {
    const head = new HttpHeaders({'Content-Type': 'text/plain'});
    return this.http.delete<string>(this.apiUrlBase + 'refOrg/delete/' + orgName + '/' + progLoc,
    {headers: head, observe: 'response', responseType: 'text' as 'json'});
  }
}
