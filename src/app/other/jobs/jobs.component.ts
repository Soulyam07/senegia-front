import {Component, OnInit} from '@angular/core';
import {JobOffersService} from '../../shared/services/job/job-offers.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {JobseekerService} from '../../shared/services/job/jobseeker.service';
import {AuthService} from '../../shared/services/auth/auth.service';
import {SaveJobService} from '../../shared/services/job/save-job.service';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CandidatureService} from '../../shared/services/job/candidature.service';

@Component({
  selector: 'app-jobs',
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent implements OnInit {


  allJobs!: any;
  paginatedJobs: any[] = [];
  organisation:any;

  jobsPerPage: number = 6;
  currentPage: number = 1;



  constructor(private joboffeService:JobOffersService,private jobseekerService:JobseekerService,
              private authService:AuthService,private saveJobService:SaveJobService,private routes:Router,
              private candidatureService:CandidatureService) {
  }

  jobSeeker!:any;
  idCandidat!:any;
  savedJobs: Set<number> = new Set();
  ngOnInit() {

    // this.joboffeService.getJob().subscribe((response: any) => {
    //   this.allJobs = (response as any[]).map((job: any) => ({
    //     ...job,
    //     skills: typeof job.skills === 'string' ? job.skills.split(',').map((s: string) => s.trim()) : []
    //   }));
    //   this.updatePaginatedJobs();
    //
    //   console.log(this.allJobs);
    // });


    this.loadJobs();

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


  get totalPages(): number {
    return Math.ceil(this.allJobs.length / this.jobsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedJobs();
    }
  }

  updatePaginatedJobs(): void {
    const start = (this.currentPage - 1) * this.jobsPerPage;
    const end = start + this.jobsPerPage;
    this.paginatedJobs = this.allJobs.slice(start, end);
  }



  isJobSaved(jobId: number): boolean {
    const exists = this.savedJobs.has(Number(jobId));
    // console.log(`Job ${jobId} saved?`, exists);
    return exists;
  }

  toggleSaveJob(jobId: number): void {
    if (!this.authService.getUsernameDem()) {
      this.routes.navigate(['/signin']);
      return;
    }

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

  // loadAppliedJobs() {
  //   this.candidatureService.viewByCandidat(this.idCandidat).subscribe((candidatures: any[]) => {
  //     this.appliedJobs = new Set(candidatures.map(c => Number(c.joboffer_id)));
  //   });
  // }

  // loadJobs() {
  //   this.joboffeService.getJob().subscribe((response: any) => {
  //     this.allJobs = (response as any[]).map((job: any) => ({
  //       ...job,
  //       skills: typeof job.skills === 'string' ? job.skills.split(',').map((s: string) => s.trim()) : []
  //     }));
  //     this.updatePaginatedJobs();
  //   });
  // }

  viewJobDetails(jobId: number) {
    this.routes.navigate(['/jobs', jobId]);
  }


  experienceFilters: any[] = [];
  typeFilters: string[] = [];
  dateFilters: string[] = [];

  loadJobs() {
    this.joboffeService.getJob().subscribe((response: any) => {
      const today = new Date();
      this.allJobs = (response as any[]).filter((job: any) => {
        let include = true;

        // Filtrage par expérience
        if (this.experienceFilters.length > 0) {
          include = this.experienceFilters.some((val) =>
            job.experience_required?.includes(val.toString())
          );
        }

        // Filtrage par type de contrat
        if (include && this.typeFilters.length > 0) {
          include = this.typeFilters.includes(job.employee_type);
        }

        // Filtrage par date de publication
        if (include && this.dateFilters.length > 0) {
          const postedDate = new Date(job.posted_date);
          include = this.dateFilters.some((filter) => {
            const diffTime = today.getTime() - postedDate.getTime();
            const diffDays = diffTime / (1000 * 3600 * 24);
            if (filter === 'Last 24 Hour') return diffDays <= 1;
            if (filter === 'Last 7 Days') return diffDays <= 7;
            if (filter === 'Last 15 Days') return diffDays <= 15;
            return true;
          });
        }

        return include;
      }).map((job: any) => ({
        ...job,
        skills: typeof job.skills === 'string' ? job.skills.split(',').map((s: string) => s.trim()) : []
      }));

      this.updatePaginatedJobs();
    });
  }

// Gestion des filtres
  onExperienceChange(value: any, event: any) {
    if (event.target.checked) {
      this.experienceFilters.push(value);
    } else {
      this.experienceFilters = this.experienceFilters.filter(v => v !== value);
    }
    this.loadJobs();
  }

  onTypeChange(value: string, event: any) {
    if (event.target.checked) {
      this.typeFilters.push(value);
    } else {
      this.typeFilters = this.typeFilters.filter(v => v !== value);
    }
    this.loadJobs();
  }

  onDateChange(value: string, event: any) {
    if (event.target.checked) {
      this.dateFilters.push(value);
    } else {
      this.dateFilters = this.dateFilters.filter(v => v !== value);
    }
    this.loadJobs();
  }

}
