import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from '../../../shared/services/auth/auth.service';
import {OrgService} from '../../../shared/services/job/org.service';
import {CoursService} from '../../../shared/services/cours/cours.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-dash-learner',
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './dash-learner.component.html',
  styleUrl: './dash-learner.component.scss'
})
export class DashLearnerComponent implements OnInit{

  organisation:any;
  companyId :any;
  cours:any;

  constructor(private authService:AuthService,private orgService:OrgService,private courService:CoursService ) {
  }

  ngOnInit() {

    this.orgService.getByEmail(this.authService.getUsernameOr()).subscribe(
      res=>{
        this.organisation=res;
        this.companyId=this.organisation.id;
        console.log(this.companyId);

        this.courService.getCoursByInstructor(this.companyId).subscribe(
          res=>{
            this.cours = res;
            console.log(this.cours);
          }
        )
      }
    );
  }


  deleteCour(id:any){
    if(confirm("Voulez-vous vraiment supprimer ce cour ?")){
      this.courService.deleteCour(id).subscribe({

        next: () => {
          console.log("Offre supprimée avec succès");
          this.orgService.getByEmail(this.authService.getUsernameOr()).subscribe(
            res=>{
              this.organisation = res;
              this.companyId = this.organisation.id;
              this.courService.getCoursByInstructor(this.companyId).subscribe(
                res=>{
                  this.cours = res;
                  console.log(this.cours);
                }
              )
            }
          );

        },
        error: (err) => {
          console.error("Erreur lors de la suppression", err);
        }
      });
    } else {
      console.log("Suppression annulée.");
    }
  }


}
