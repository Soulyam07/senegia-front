import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  url = environment.API_EndPoint_CANDIDATURE;
  constructor(private http: HttpClient) { }


  public postuler(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }

  public viewByCandidat(idCandidat: any): Observable<any> {
    const url2 = this.url +'?idCandidat='+idCandidat;
    return this.http.get(url2);
  }

  public cancelPostuler(idCandidat:any,idJob:any): Observable<any> {
    const url2 = this.url + '?idCandidat='+idCandidat+'&idJobOffers='+idJob;
    return this.http.delete(url2).pipe(
      map(data => data )
    );
  }

  public viewAllCandidat(idJob:any){
    const url2 = this.url +'?idJobs='+idJob;
    return this.http.get(url2);
  }

  public updateCandid(data:any):Observable<any>{
    // const url2 = this.url +'?idCand='+idCand+'&statut='+statut;
    return this.http.post<any>(this.url,data);
  }
}
