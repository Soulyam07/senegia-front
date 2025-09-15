import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {JobOffersService} from '../../shared/services/job/job-offers.service';
import {DatePipe, NgClass, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {CandidatureService} from '../../shared/services/job/candidature.service';
import {AuthService} from '../../shared/services/auth/auth.service';
import {JobseekerService} from '../../shared/services/job/jobseeker.service';
import {SaveJobService} from '../../shared/services/job/save-job.service';
import {StudentService} from '../../student/shared/services/student.service';
import {SaveCourService} from '../../student/shared/services/saveCour.service';
import {CoursService} from '../../shared/services/cours/cours.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NgForOf,
    DatePipe,
    NgIf,
    SlicePipe,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private jobofferService:JobOffersService,private candidatureService:CandidatureService,
              private authService:AuthService,private routes:Router,private jobseekerService:JobseekerService,
              private saveJobService:SaveJobService,private studentService:StudentService,private saveCourService:SaveCourService,
              private courService:CoursService) {
  }

  jobs!:any;
  jobSeeker!:any;

  savedJobs: Set<number> = new Set();
  idStudent!:any;
  student!:any;
  saveCour2:any;
  saveCour:Set<number> = new Set();
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
    this.loadCours();
  if(this.authService.getUsernameStd()){
    this.studentService.viewByEmail(this.authService.getUsernameStd()).subscribe(
      res=> {
        this.student = res;
        this.idStudent = this.student.id;

        this.saveCourService.viewSaveByStudent(this.idStudent).subscribe(saved => {
          this.saveCour2 = saved;
          console.log(saved);
          if(saved && Array.isArray((saved))){
            const ids = saved.map((s:any)=>Number(s.id));
            console.log(ids);
            this.saveCour = new Set(ids);
          }
          else{
            this.saveCour = new Set();
          }
        })

      })
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

  isCourSaved(idCour:number):boolean{
    const exists = this.saveCour.has(Number(idCour));

    return exists;
  }

  toggleSaveCour(courId:number):void{
    if(!this.authService.getUsernameStd()){
      this.routes.navigate(['/signin']);
      return;
    }
    if(this.isCourSaved(courId)){
      if(confirm("Voulez vous supprimer cette cour?")){
        this.saveCourService.deleteSave(this.idStudent,courId).subscribe(res=>{
          this.saveCour.delete(courId);
          location.reload();
        });
      }
      return;
    }else{

      const formData = new FormData();
      formData.append('idStudent', this.idStudent.toString());
      formData.append('idCour', courId.toString());

      this.saveCourService.saveCour(formData).subscribe(()=>{
        this.saveCour.add(courId);
      })

    }
  }
  details(id: any) {
    this.routes.navigate(['/courses',id]);
  }

  groupedCourses: any[][] = [];
  cours: any;
  loadCours(){
    this.courService.getAllCours().subscribe((data)=>{
      this.cours = data || [];
      console.log(this.cours)
      this.groupCourses();
    })
  }
  groupCourses() {
    this.groupedCourses = [];
    for (let i = 0; i < this.cours.length; i += 2) {
      this.groupedCourses.push(this.cours.slice(i, i + 2));
    }
  }
}
