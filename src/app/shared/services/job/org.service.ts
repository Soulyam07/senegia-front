import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgService {


  constructor(private httpClient:HttpClient) { }

  public getAllJob(){
      const url = environment.API_EndPoint_ORG;
      return this.httpClient.get(url).pipe(
        map(
          entreprise => entreprise
        )
      )
  }

  public getByEmail(email:any){
    const url = environment.API_EndPoint_ORG +'?email='+email;
    return this.httpClient.get(url).pipe(
      map(
        data => data
      )
    )
  }

  public register(data:any):Observable<any>{
    const url = environment.API_EndPoint_ORG;
    return this.httpClient.post<any>(url, data);
  }



}
