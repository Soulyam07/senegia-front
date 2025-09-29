import {Component, OnInit} from '@angular/core';
import {JobseekerService} from '../../shared/services/job/jobseeker.service';
import {AuthService} from '../../shared/services/auth/auth.service';
import {CandidatureService} from '../../shared/services/job/candidature.service';
import {OrgService} from '../../shared/services/job/org.service';
import {NgIf} from '@angular/common';
import {JobOffersService} from '../../shared/services/job/job-offers.service';

@Component({
  selector: 'app-profil',
  imports: [
    NgIf
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {

  candidat!:any;
  totalP!:any;
  totalA!:any;
  totalR!:any;
  totalE!:any;
  organisation!:any;
  org!:any;
  cand!:any;
  nbreJobs:any;
  nbreW!:any;
  nbreA!:any;
  constructor(private jobseekerService: JobseekerService,private authService: AuthService,
              private candidatureServoce:CandidatureService,private orgService:OrgService,
              private jobService:JobOffersService) {
  }

  ngOnInit() {

    this.org = this.authService.getUsernameOr();
    this.cand = this.authService.getUsernameDem();


    if(this.cand) {
      this.jobseekerService.viewByEmail(this.authService.getUsernameDem()).subscribe(
        res=>{
          this.candidat = res;
          console.log(res);

          this.candidatureServoce.viewByCandidat(this.candidat.id).subscribe(
            res=>{
              this.totalP = res.length;
              this.totalA = res.filter((c: any) => c.statut === 'accepté').length;
              this.totalR = res.filter((c: any) => c.statut === 'refusé').length;
              this.totalE = res.filter((c: any) => c.statut === 'en attente').length;
            }
          )
        }
      )
    }
    if(this.org){
      this.orgService.getByEmail(this.authService.getUsernameOr()).subscribe(
        res=>{
          this.organisation = res;
          this.jobService.getJobByOrg(this.organisation.id).subscribe(
            job=>{
              this.nbreJobs = job.length;
              this.jobService.getCountW(this.organisation.id).subscribe(
                res => {

                  this.nbreW = res;
                },
                error => {
                  console.error('Erreur lors de la récupération du nombre :', error);
                }
              );
              this.jobService.getCountA(this.organisation.id).subscribe(
                res => {

                  this.nbreA = res;
                },
                error => {
                  console.error('Erreur lors de la récupération du nombre :', error);
                }
              );
            }
          )

          console.log(res);
        }
      )
    }

  }

}
