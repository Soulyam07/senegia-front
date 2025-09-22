import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JobOffersService} from '../../../shared/services/job/job-offers.service';
import {OrgService} from '../../../shared/services/job/org.service';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {CandidatureService} from '../../../shared/services/job/candidature.service';

@Component({
  selector: 'app-managed-job',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './managed-job.component.html',
  styleUrl: './managed-job.component.scss'
})
export class ManagedJobComponent implements OnInit{
  jobForm: FormGroup;

  organisation:any;
  companyId :any;
  jobs:any[]=[];
  jobDetails:any;
  nbreJobs:any;
  constructor(private fb: FormBuilder,private jobService:JobOffersService,private orgService:OrgService,
              private authService:AuthService,private candidatureService:CandidatureService) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      experience_required: ['', Validators.required],
      work_level: ['', Validators.required],
      employee_type: ['', Validators.required],
      salary_usd_per_month: [0, Validators.required],
      job_description: ['', Validators.required],
      company_id: ['', Validators.required], // ID entreprise par défaut
      responsibilities: this.fb.array([this.fb.control('', Validators.required)]),
      skills: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  ngOnInit() {

    this.orgService.getByEmail(this.authService.getUsernameOr()).subscribe(
      res =>{
        console.log(res);
        this.organisation = res;
        this.companyId = this.organisation.id;
        this.jobForm.get('company_id')?.setValue(this.companyId);
        this.loadJob();

      }
    )



    console.log(this.companyId);


  }

  loadJob(){
    this.jobService.getJobByOrg(this.companyId).subscribe(
      job=>{

        this.jobs = job;
        this.nbreJobs = this.jobs.length;
        console.log(job);
      }
    )
  }
  getEducationArray(education: string | null): string[] {
    return education ? education.split(',') : [];
  }

  getSkillsArray(skills: string | null): string[] {
    return skills ? skills.split(',') : [];
  }

  get responsibilities() {
    return this.jobForm.get('responsibilities') as FormArray;
  }

  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }

  addResponsibility() {
    this.responsibilities.push(this.fb.control('', Validators.required));
  }

  removeResponsibility(index: number) {
    this.responsibilities.removeAt(index);
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onsubmit() {
    const formData = new FormData();
    formData.append('employee_type', this.jobForm.get('employee_type')?.value);
    formData.append('title', this.jobForm.get('title')?.value);
    formData.append('experience_required', this.jobForm.get('experience_required')?.value); // ✅ Corrigé ici
    formData.append('work_level', this.jobForm.get('work_level')?.value);
    formData.append('salary_usd_per_month', this.jobForm.get('salary_usd_per_month')?.value);
    formData.append('company_id', this.jobForm.get('company_id')?.value);
    formData.append('job_description', this.jobForm.get('job_description')?.value);

    // ✅ Convertir les tableaux en JSON string
    const responsibilities = this.jobForm.get('responsibilities')?.value;
    const skills = this.jobForm.get('skills')?.value;
    formData.append('responsibilities', JSON.stringify(responsibilities));
    formData.append('skills', JSON.stringify(skills));

    console.log(this.jobForm.value);

    this.jobService.createJob(formData).subscribe({
      next: () => {
        console.log("Emploi ajouté avec succès");
        this.jobService.getJobByOrg(this.companyId).subscribe(
          res =>{
            this.jobs = res;
            location.reload();
          }
        )
      }
      // error: (err) => {
      //   console.log("Erreur lors de l'ajout !");
      // }
    });
  }

  deleteJob(id: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      this.jobService.deleteJob(id).subscribe({
        next: () => {
          console.log("Offre supprimée avec succès");
          this.jobService.getJobByOrg(this.companyId).subscribe(
            res =>{
              this.jobs = res;
            }
          )
        },
        error: (err) => {
          console.error("Erreur lors de la suppression", err);
        }
      });
    } else {
      console.log("Suppression annulée.");
    }
  }

  getById(id:any){
    this.jobService.getJobById(id).subscribe(
      res =>{
        this.jobDetails = res;
        console.log(res);
      }
    )
  }

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


}
