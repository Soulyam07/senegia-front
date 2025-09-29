import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map, Observable} from 'rxjs';
import {Chapter} from '../../models/Chapter';
import {Lesson} from '../../models/Lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }

  public getAllCours(){
    const url = environment.API_EndPoint_COURS;
    return this.http.get(url);
  }
  public getCoursByInstructor(instructorId:any){
    const url = environment.API_EndPoint_COURS +'?companyId='+instructorId;

    return this.http.get(url);
  }
  public getCourById(id:number){
    const url = environment.API_EndPoint_COURS +'?idCour='+id;
    return this.http.get(url);
  }
  public getLeconByChap(id:number):Observable<Lesson[]>{
    const url = environment.API_EndPoint_COURS +'?idSection='+id;
    return this.http.get<Lesson[]>(url);
  }

  public deleteCour(instructorId:any){
    const url = environment.API_EndPoint_COURS+ '?id='+instructorId;
    return this.http.delete(url).pipe(
      map(data => data )
    );
  }

  public getCategory(){
    const url = environment.API_EndPoint_CATEGORY;
    return this.http.get(url);
  }

  public addCategory(category:any){
    const url = environment.API_EndPoint_CATEGORY;
    return this.http.post(url, category);
  }

  getChapitreByCours(idCours:any):Observable<Chapter[]>{
    const url = environment.API_EndPoint_COURS +'?idCours='+idCours;
    return this.http.get<Chapter[]>(url);
  }

//   public addCours(cours:any){
//     const url = environment.API_EndPoint_COURS;
//     return this.http.post(url, cours);
//   }
// // cour.service.ts
//   public addChapitree(chapter: any) {
//     const url = environment.API_EndPoint_COURS;
//
//     // Envoie JSON avec header explicite
//     return this.http.post(url, chapter, {
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }

  // Création d'un cours avec ses chapitres et leçons
  public addCoursAvecChapitres(coursData: any): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = environment.API_EndPoint_COURS;
    return this.http.post<any>(url, coursData);
  }

  // Si tu veux garder une méthode séparée pour un cours seul
  public addCoursSimple(cours: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = environment.API_EndPoint_COURS;
    return this.http.post<any>(url, cours, { headers });
  }


}
