import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MenustudentComponent } from "../config/menustudent/menustudent.component";
import { Cours, CoursService } from '../services/cours.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dash',
  imports: [
    RouterModule,
    CommonModule, 
    MenustudentComponent
],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponentStudent {
  coursList: Cours[] = [];
loading = true;
  constructor(private coursService: CoursService) {}

ngOnInit(): void {
  this.coursService.getCours().subscribe({
    next: (response) => {
      this.coursList = response;
      this.loading = false;
    },
    error: (err) => {
      console.error('Erreur :', err);
      this.loading = false;
    },
  });
}
}
