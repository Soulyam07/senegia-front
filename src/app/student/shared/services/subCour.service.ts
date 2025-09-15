import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SubCourService {
  url = environment.API_EndPoint_SUB;

  constructor(private http: HttpClient) {
  }

  public subCour(data:any):Observable<Object>{
    return this.http.post(this.url,data);
  }

  public viewSub(idStudent:any,idCour:any):Observable<any>{
    const url2= this.url +'?idStudent='+idStudent+'&idCour='+idCour;
    return this.http.get<any>(url2);

  }

  public viewSubByStd(idStudent:any):Observable<any>{
    const url2 = this.url + '?idStudent='+idStudent;
    return this.http.get<any>(url2);
  }

  public deleteSub(idStudent:any,idCour:any):Observable<any>{
    const url2 = this.url + '?idStudent='+idStudent+'&idCour='+idCour;
    return this.http.delete<any>(url2).pipe(
      map(
        data => data
      )
    )
  }
}
