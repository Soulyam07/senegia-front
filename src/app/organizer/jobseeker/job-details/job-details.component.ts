import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {JobOffersService} from '../../../shared/services/job/job-offers.service';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {CandidatureService} from '../../../shared/services/job/candidature.service';
import {JobseekerService} from '../../../shared/services/job/jobseeker.service';
import {SaveJobService} from '../../../shared/services/job/save-job.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-job-details',
  imports: [
    NgForOf,
    NgIf,
    NgClass,

    // RouterLink,
    // NgForOf
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements OnInit {

  jobDetails!: any;
  organisation!: any;
  idCandidat!: number;
  appliedJobs: Set<number> = new Set();
  jobSeeker!: any;
  subscription!: Subscription;

  constructor(
    private jobofferService: JobOffersService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private candidatureService: CandidatureService,
    private jobseekerService: JobseekerService,
    private router: Router,
    private saveJobService:SaveJobService
  ) { }

  isJob2!:any;
  jobStatut!: string | null;
  savedJobs: Set<number> = new Set();
  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const idJob = params.get('id');
      this.isJob2 = idJob ? Number(idJob) : null;

      if (this.isJob2 !== null) {
        this.loadJobDetails(this.isJob2);
        this.loadCandidatureData();
      }
    });

    const idJob = this.route.snapshot.paramMap.get('id');
    this.isJob2 = idJob ? Number(idJob) : null;
    this.loadJobs();

    // 1. Charger les détails du job
    if (this.isJob2 !== null) {
      this.jobofferService.getJobById(this.isJob2).subscribe(res => {
        this.jobDetails = res;
      });
    }

    // 2. Charger les infos du candidat connecté
    const email = this.authService.getUsernameDem();
    if (email) {
      this.jobseekerService.viewByEmail(email).subscribe(res => {
        this.jobSeeker = res;
        this.idCandidat = this.jobSeeker.id;
        console.log(this.jobSeeker);

        // 3. Candidatures existantes
        this.candidatureService.viewByCandidat(this.idCandidat).subscribe(candidature => {
          console.log(candidature)
          if (candidature && Array.isArray(candidature)) {
            const ids = candidature.map((s: any) => Number(s.job_id));
            this.appliedJobs = new Set(ids);
            const current = candidature.find((c: any) => Number(c.job_id) === this.isJob2);
            if (current) {
              this.jobStatut = current.statut;
              console.log('Statut de la candidature :', this.jobStatut);
            } else {
              this.jobStatut = null;
            }
          }
        });
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
      });
    }

  }
  loadJobDetails(jobId: number) {
    this.jobofferService.getJobById(jobId).subscribe(res => {
      this.jobDetails = res;
    });
  }

  loadCandidatureData() {
    const email = this.authService.getUsernameDem();
    if (email) {
      this.jobseekerService.viewByEmail(email).subscribe(res => {
        this.jobSeeker = res;
        this.idCandidat = this.jobSeeker.id;

        this.candidatureService.viewByCandidat(this.idCandidat).subscribe(candidature => {
          if (candidature && Array.isArray(candidature)) {
            const ids = candidature.map((s: any) => Number(s.job_job_id));
            this.appliedJobs = new Set(ids);

            const current = candidature.find((c: any) => Number(c.job_job_id) === this.isJob2);
            this.jobStatut = current ? current.statut : null;
          }
        });
      });
    }
  }

  isJobApplied(jobId: number): boolean {
    return this.appliedJobs.has(jobId);
  }

  postuler(jobId: number): void {
    if (!this.authService.getUsernameDem()) {
      this.router.navigate(['/signin']);
      return;
    }

    const formData = new FormData();
    formData.append('idCandidat', this.idCandidat.toString());
    formData.append('idJobOffers', jobId.toString());

    this.candidatureService.postuler(formData).subscribe(() => {
      this.appliedJobs.add(jobId);
    });
  }

  cancelPostuler(jobId: number): void {
    if (confirm('Voulez-vous enlever votre depot ?')) {
      this.candidatureService.cancelPostuler(this.idCandidat, jobId).subscribe(() => {
        this.appliedJobs.delete(jobId);
      });
    }
  }

  allJobs!: any;
  // allJobs!: any[];

  loadJobs() {
    const currentJobId = Number(this.route.snapshot.paramMap.get('id'));

    this.jobofferService.getJob().subscribe((response: any) => {
      this.allJobs = response
        .filter((job: any) => Number(job.job_id) !== currentJobId) // ✅ exclure le job courant
        .map((job: any) => ({
          ...job,
          skills: typeof job.skills === 'string'
            ? job.skills.split(',').map((s: string) => s.trim())
            : []
        }));

      console.log(this.allJobs);
    });
  }



  viewJobDetails(jobId: number) {
    this.router.navigate(['jobs', jobId]);
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


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
