import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {JobOffersService} from '../../shared/services/job/job-offers.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {CandidatureService} from '../../shared/services/job/candidature.service';
import {AuthService} from '../../shared/services/auth/auth.service';
import {JobseekerService} from '../../shared/services/job/jobseeker.service';
import {SaveJobService} from '../../shared/services/job/save-job.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private jobofferService:JobOffersService,private candidatureService:CandidatureService,
              private authService:AuthService,private routes:Router,private jobseekerService:JobseekerService,private saveJobService:SaveJobService) {
  }

  jobs!:any;
  jobSeeker!:any;

  savedJobs: Set<number> = new Set();
  ngOnInit() {

    // this.jobofferService.getJob().subscribe((response: any) => {
    //   this.jobs = response
    //     // ✅ exclure le job courant
    //     .map((job: any) => ({
    //       ...job,
    //       skills: typeof job.skills === 'string'
    //         ? job.skills.split(',').map((s: string) => s.trim())
    //         : []
    //     }));
    //
    //   console.log(this.jobs);
    // });
    this.loadJobs();
  if(this.authService.getUsernameDem()){
    this.jobseekerService.viewByEmail(this.authService.getUsernameDem()).subscribe(
      result => {


        // this.loadAppliedJobs();


        this.jobSeeker = result;
        this.idCandidat = this.jobSeeker.id;
        // console.log(this.jobSeeker);

        this.saveJobService.viewSaveByCandidat(this.idCandidat).subscribe(saved => {
          console.log(saved);
          if (saved && Array.isArray(saved)) {
            const ids = saved.map((s: any) => Number(s.joboffer_id));
            console.log('Jobs sauvegardés (IDs):', ids);
            this.savedJobs = new Set(ids);
          } else {
            this.savedJobs = new Set();
          }

        });

        this.candidatureService.viewByCandidat(this.idCandidat).subscribe(candidature => {
          console.log(candidature);
          if(candidature && Array.isArray(candidature)) {
            const ids = candidature.map((s: any) => Number(s.job_id));
            this.appliedJobs = new Set(ids);
          }
          else{
            this.savedJobs = new Set();
          }
        })



      }
    )
  }
  }

  groupedJobs: any[][] = [];

  loadJobs() {
    this.jobofferService.getJob().subscribe((response: any) => {
      const jobs = response.map((job: any) => ({
        ...job,
        skills: typeof job.skills === 'string'
          ? job.skills.split(',').map((s: string) => s.trim())
          : []
      }));


      // Grouper par 6
      this.groupedJobs = [];
      for (let i = 0; i < jobs.length; i += 6) {
        this.groupedJobs.push(jobs.slice(i, i + 6));
      }
      console.log(this.groupedJobs)
    });
  }

  appliedJobs: Set<number> = new Set();
  idCandidat!:any;

  postuler(jobId: number) {
    if (!this.authService.getUsernameDem()) {
      this.routes.navigate(['/signin']);
      return;
    }

    const formData = new FormData();
    formData.append('idCandidat', this.idCandidat.toString());
    formData.append('idJobOffers', jobId.toString());

    this.candidatureService.postuler(formData).subscribe(() => {
      this.appliedJobs.add(Number(jobId)); // ✅ mise à jour locale
    });
  }


  cancelPostuler(jobId: number) {
    if (confirm('Voulez-vous enlever votre depot ?')) {
      this.candidatureService.cancelPostuler(this.idCandidat, jobId).subscribe(() => {
        this.appliedJobs.delete(jobId); // ✅ mise à jour locale
      });
    }

  }

  viewJobDetails(jobId: number) {
    this.routes.navigate(['/jobs', jobId]);
  }
}
