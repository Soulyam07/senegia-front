import {Component, OnInit} from '@angular/core';
import {JobseekerService} from '../../../shared/services/job/jobseeker.service';
import {SaveJobService} from '../../../shared/services/job/save-job.service';
import {CandidatureService} from '../../../shared/services/job/candidature.service';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-applied-jobs',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    NgClass
  ],
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.scss'
})
export class AppliedJobsComponent {


  constructor(private jobseekerService: JobseekerService,private saveJobService:SaveJobService,
              private candidatureService:CandidatureService,private authService:AuthService,
              private routes:Router) {
  }

  jobSeeker:any;
  appliedJobs2:any=[];
  saveJobs2:any=[];
  organisation:any;
  savedJobs: Set<number> = new Set();

  idCandidat!:any;
  ngOnInit() {
    this.jobseekerService.viewByEmail(this.authService.getUsernameDem()).subscribe(
      res=>{
        this.jobSeeker = res;
        this.idCandidat = this.jobSeeker.id;
        console.log(this.jobSeeker);
        this.candidatureService.viewByCandidat(this.jobSeeker.id).subscribe(
          res=>{
            this.appliedJobs2 = (res as any[]).map((job: any) => ({
              ...job,
              skills: typeof job.skills === 'string' ? job.skills.split(',').map((s: string) => s.trim()) : []
            }));
            // this.appliedJobs = res;
            // console.log(this.appliedJobs);

            if(res && Array.isArray(res)) {
              const ids = res.map((s: any) => Number(s.job_id));
              this.appliedJobs = new Set(ids);
            }
            else{
              this.savedJobs = new Set();
            }
          }
        );
        this.saveJobService.viewSaveByCandidat(this.jobSeeker.id).subscribe(
          res =>{
            this.saveJobs2 = res;
            if (res && Array.isArray(res)) {
              const ids = res.map((s: any) => Number(s.joboffer_id));
              console.log('Jobs sauvegardés (IDs):', ids);
              this.savedJobs = new Set(ids);
            } else {
              this.savedJobs = new Set();
            }

          }
        )
      }
    )
  }




  isJobSaved(jobId: number): boolean {
    const exists = this.savedJobs.has(Number(jobId));
    // console.log(`Job ${jobId} saved?`, exists);
    return exists;
  }

  toggleSaveJob(jobId: number): void {
    if (this.isJobSaved(jobId)) {
      if (confirm('Voulez-vous retirer ce job de vos favoris ?')) {
        this.saveJobService.deleteSave(this.idCandidat,jobId).subscribe(() => {
          this.savedJobs.delete(jobId);
        });
      }
      return;
    } else {

      const formData = new FormData();
      formData.append('idCandidat', this.idCandidat.toString());
      formData.append('idJobOffers', jobId.toString());

      this.saveJobService.saveJob(formData).subscribe(() => {
        this.savedJobs.add(jobId); // Mise à jour UI
      });
    }
  }

  appliedJobs: Set<number> = new Set();


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
