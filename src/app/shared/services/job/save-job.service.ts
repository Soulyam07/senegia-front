import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveJobService {

  url = environment.API_EndPoint_SAVEJOB
  constructor(private http: HttpClient) { }

  public saveJob(data: any) {
    return this.http.post(this.url,data)
  }

  public viewSave(idCandidat:any,idJob:any): Observable<any> {
    const url2 = this.url + '?idCandidat='+idCandidat+'&idJobOffers='+idJob;
    return this.http.get<any>(url2);
  }

  public viewSaveByCandidat(idCandidat:any): Observable<any> {
    const url2 = this.url + '?idCandidat='+idCandidat;
    return this.http.get<any>(url2);
  }

  public deleteSave(idCandidat:any,idJob:any): Observable<any> {
    const url2 = this.url + '?idCandidat='+idCandidat+'&idJobOffers='+idJob;
    return this.http.delete(url2).pipe(
      map(data => data )
    );
  }

}
