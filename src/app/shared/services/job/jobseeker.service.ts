import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {

  url = environment.API_EndPoint_CANDIDAT;
  constructor(private httpClient: HttpClient) { }

  public register(data:any):Observable<any>{
    return this.httpClient.post<any>(this.url, data);

  }
  email!:string;
  setEmail(email:string){
    this.email = email;
    sessionStorage.setItem('email',email);
    localStorage.setItem('email',email);
  }

  getEmail(){
    const storeEmail = localStorage.getItem('email');
    if(storeEmail){
      this.email = storeEmail;
      return storeEmail;
    }
    return this.email?.toString() || sessionStorage.getItem('email');
  }

  public addDetails(dataDetails:any):Observable<any>{
    return this.httpClient.post<any>(this.url, dataDetails);
  }

  public viewByEmail(email:any){
    const url2= this.url+'?email='+email;
    return this.httpClient.get(url2).pipe(
      map(
        data => data
      )
    )
  }

  public updateCV(data:any){
    return this.httpClient.post(this.url,data);
  }
}
