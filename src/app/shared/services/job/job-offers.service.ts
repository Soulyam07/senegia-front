import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobOffersService {

  url = environment.API_EndPoint_JOB;
  constructor(private http:HttpClient) { }

  public createJob(data:any):Observable<any>{
    return this.http.post<any>(this.url,data);
  }

  public getJob(){
    return this.http.get(this.url);
  }

  public getJobByOrg(companyId:any):Observable<any>{
    const url2 = this.url + '?companyId='+companyId;
    return this.http.get<any>(url2);
  }

  public deleteJob(id:any){
    const url2 = this.url + '?id='+id;
    return this.http.delete(url2).pipe(
      map(data => data )
    );
  }

  public getJobById(id:any):Observable<any>{
    const url2 = this.url + '?id='+id;
    return this.http.get<any>(url2);
  }
  public getCountW(id:any):Observable<any>{
    const url2 = this.url + '?idC='+id;
    return this.http.get<any>(url2).pipe(
      map(data => data )
    );
  }

  public getCountA(id:any){
    const url2 = this.url + '?idA='+id;
    return this.http.get(url2).pipe(
      map(data => data )
    );
  }


}
