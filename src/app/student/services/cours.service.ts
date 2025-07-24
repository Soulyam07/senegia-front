import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cours {
  id: number;
  entreprise_id: number;
  titre: string;
  description: string;
  prix: number;
  date_creation: string;
  total_heures: number;      
  total_etudiants: number;  
  total_lectures: number; 
}

@Injectable({
  providedIn: 'root',
})
export class CoursService {
  private apiUrl = 'http://localhost/api_rh/cours/lire';

  constructor(private http: HttpClient) {}

  // Récupérer tous les cours
  getCours(): Observable< Cours[] > {
    return this.http.get< Cours[] >(this.apiUrl);
  }
}
