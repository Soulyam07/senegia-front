import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../shared/services/auth/auth.service';
import {OrgService} from '../../shared/services/job/org.service';
import {NgForOf, NgIf} from '@angular/common';
import {JobOffersService} from '../../shared/services/job/job-offers.service';
import {CandidatureService} from '../../shared/services/job/candidature.service';

@Component({
  selector: 'app-dash-princip',
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './dash-princip.component.html',
  styleUrl: './dash-princip.component.scss'
})
export class DashPrincipComponent implements OnInit{

  organisation:any;
  companyId :any;
  jobs:any;
  nbreJobs:any;
  nbreW:any;
  nbreA:any;
  constructor(private authService:AuthService,private orgService:OrgService,
              private jobService:JobOffersService,private candidatureService:CandidatureService) {
  }

  ngOnInit() {



    this.orgService.getByEmail(this.authService.getUsernameOr()).subscribe(
      res =>{
        console.log(res);
        this.organisation = res;
        this.companyId = this.organisation.id;
        this.jobService.getJobByOrg(this.companyId).subscribe(
          job=>{
            this.jobs = job;
            // console.log(this.jobs);
            this.nbreJobs = this.jobs.length;
            this.jobService.getCountW(this.companyId).subscribe(
              res => {

                this.nbreW = res;
              },
              error => {
                console.error('Erreur lors de la récupération du nombre :', error);
              }
            );
            this.jobService.getCountA(this.companyId).subscribe(
              res => {

                this.nbreA = res;
              },
              error => {
                console.error('Erreur lors de la récupération du nombre :', error);
              }
            );
          }
        )

      }
    )

    //
  }

  getSkillsArray(skills: string | null): string[] {
    return skills ? skills.split(',') : [];
  }
  getEducationArray(education: string | null): string[] {
    return education ? education.split(',') : [];
  }




  // viewApplicant(idJob:any){
  //   this.candidatureService.viewAllCandidat(idJob).subscribe(
  //     res=>{
  //       this.candidats = res;
  //       console.log(res);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  candidats!:any;
  currentJobId!:number;
  viewApplicant(idJob: any) {
    this.currentJobId = idJob; // sauvegarde du job courant
    this.candidatureService.viewAllCandidat(idJob).subscribe(
      res => {
        this.candidats = res;
        // console.log(this.candidats);
      },
      error => {
        console.log(error);
      }
    );
  }

  // updateStatut(idCand: any, statut: any) {
  //   let formData = new FormData();
  //   formData.append('idCand', idCand);
  //   formData.append('statut', statut);
  //   this.candidatureService.updateCandid(formData).subscribe(
  //     res => {
  //
  //       console.log(idCand);
  //       const candidatModifie = this.candidats.find((c: any) => c.id === idCand);
  //       if (candidatModifie) {
  //         candidatModifie.statut = statut;
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  updateStatut(idCand: any, statut: any) {
    let formData = new FormData();
    formData.append('idCand', idCand);
    formData.append('statut', statut);
    this.candidatureService.updateCandid(formData).subscribe(
      res => {
        // Recharger la liste des candidats après modification
        this.viewApplicant(this.currentJobId); // tu dois avoir currentJobId dans ton composant
      },
      error => {
        console.log(error);
      }
    );
  }

  // updateStatut(idCand:any,statut:any){
  //   // let formData = new FormData();
  //   // formData.append('idCand', idCand);
  //   // formData.append('statut', statut);
  //   this.candidatureService.updateCandid(idCand,statut).subscribe(
  //     res=>{
  //       this.candidats = res;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }


}
