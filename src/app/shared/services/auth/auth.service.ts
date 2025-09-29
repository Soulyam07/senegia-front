import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import { HttpResponse } from '../../models/http-response';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }

  private isLoggedIn = false;
  private email!:any;

  private emailDem!:any;
  private isLoggedInDem = false

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasActiveSession());
  public loggedIn$ = this.loggedInSubject.asObservable();

  private hasActiveSession(): boolean {
    return !!(this.getUsernameDem() || this.getUsernameOr() || this.getUsernameStd() );
  }
  // loginOr(email:string,password:string):Observable<any>{
  loginOr(data:any):Observable<any>{
    const url = environment.API_EndPoint_ORG ;
    return this.http.post(url,data);
  }

  loginCan(data:any):Observable<any>{
    const url = environment.API_EndPoint_CANDIDAT;
    return this.http.post(url,data);
  }

  loginStd(data:any){
    const url = environment.API_EndPoint_STUDENT;
    return this.http.post(url,data);
  }



  // logOutOr(username:string){
  //   const url = environment.API_EndPoint_ORG + 'logout.php?login='+username;
  //   this.signOut();
  //   return this.http.get<HttpResponse>(url);
  // }




  setLoggedInOr(status:boolean){
    this.isLoggedIn = status;
  }
  setLoggedInDem(status:boolean){
    this.isLoggedInDem = status;
  }

  getLoggedInOr(){
    return this.isLoggedIn;
  }
  getLoggedInDem(){
    return this.isLoggedInDem;
  }

  // setUsernameOr(email:string){
  //   this.email = email;
  //   sessionStorage.setItem('email',email);
  //   localStorage.setItem('email', email);
  // }
  // setUsernameDem(email:string){
  //   this.emailDem = email;
  //   sessionStorage.setItem('emailDem',email);
  //   localStorage.setItem('emailDem',email);
  // }
  //
  // getUsernameOr() {
  //   // Check localStorage first for persistent login data
  //   const storedUsername = localStorage.getItem('email');
  //   if (storedUsername) {
  //     this.email = storedUsername;
  //     return storedUsername;
  //   }
  //
  //   // If not found in localStorage, fall back to sessionStorage
  //   return this.email?.toString() || sessionStorage.getItem('email');
  // }
  //
  // getUsernameDem(){
  //   const storedUsername = localStorage.getItem('emailDem');
  //   if (storedUsername) {
  //     this.emailDem = storedUsername;
  //     return storedUsername;
  //   }
  //   return this.emailDem?.toString() || sessionStorage.getItem('emailDem');
  // }
  //

  setUsernameDem(email: string): void {
    localStorage.setItem('emailDem', email);
    this.loggedInSubject.next(true);
  }

  getUsernameDem(): string | null {
    return localStorage.getItem('emailDem');
  }

  setUsernameOr(email: string): void {
    localStorage.setItem('emailOrg', email);
    this.loggedInSubject.next(true);
  }

  getUsernameOr(): string | null {
    return localStorage.getItem('emailOrg');
  }

  setUsernameStd(email: string): void {
    localStorage.setItem('emailStd', email);
    this.loggedInSubject.next(true);
  }
  getUsernameStd():string | null{
    return localStorage.getItem('emailStd');
  }

  // signOut(): void {
  //   localStorage.clear();
  //   sessionStorage.clear();
  //   this.router.navigate(['/signin']);
  //
  // }

  signOut(): void {
    localStorage.removeItem('emailOrg');
    localStorage.removeItem('emailDem');
    localStorage.removeItem('emailStd');
    sessionStorage.clear();

    this.loggedInSubject.next(false);
    this.router.navigate(['/signin']);

  }

}
