import {Component, OnInit} from '@angular/core';
import {JobseekerService} from '../../../shared/services/job/jobseeker.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-details-jobseeker',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './details-jobseeker.component.html',
  styleUrl: './details-jobseeker.component.scss'
})
export class DetailsJobseekerComponent implements OnInit {

  constructor(private jobseekerService: JobseekerService,private fb:FormBuilder, private router:Router) {
    this.jobSeekerForm = this.fb.group({
      idCandidat : ['',Validators.required],
      educations:this.fb.array([]),
      experience:this.fb.array([])
    });

    this.addEducation();
    this.addExperience();
  }

  expEtat = true;
  sayNo(){
    this.expEtat = false;
  }
  sayYes(){
    this.expEtat = true;
  }
  get educations() {
    return this. jobSeekerForm.get('educations') as FormArray;
  }

  get experience() {
    return this. jobSeekerForm.get('experience') as FormArray;
  }

  addEducation() {
    this.educations.push(this.fb.group({
      qualification: ['', Validators.required],
      university: ['', Validators.required],
      field: ['', Validators.required],
      year:['', Validators.required]
    }));
  }

  removeEducation(index: number) {
    this.educations.removeAt(index);
  }

  addExperience() {
    this.experience.push(this.fb.group({
      occupation: ['', Validators.required],
      experience_level: ['', Validators.required],
      employer: ['', Validators.required],
      year:['', Validators.required]
    }));
  }

  removeExperience(index: number) {
    this.experience.removeAt(index);
  }

  jobSeeker!:any;
  jobSeekerForm: FormGroup;
  idCandidat!: any;
  ngOnInit() {

    this.jobseekerService.viewByEmail(this.jobseekerService.getEmail()).subscribe(
      result => {
       this.jobSeeker = result;

        this.idCandidat = this.jobSeeker.id;
      }
    )


  }

  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  removeFile(): void {
    this.selectedFile = null;
  }

  addDetails() {
    const educations = this.jobSeekerForm.get('educations')?.value ?? [];
    const experiences = this.jobSeekerForm.get('experience')?.value ?? [];

    console.log(experiences)

    if (!this.idCandidat) {
      console.error("ID candidat manquant");
      return;
    }

    const detailsFormData = new FormData();
    detailsFormData.append('idCandidat', this.idCandidat);
    detailsFormData.append('educations', JSON.stringify(educations));
    detailsFormData.append('experiences', JSON.stringify(experiences));


    this.jobseekerService.addDetails(detailsFormData).subscribe({
      next: () => {
        if (this.selectedFile) {
          const cvFormData = new FormData();
          cvFormData.append('idCandidat', this.idCandidat);
          cvFormData.append('cv_candidat', this.selectedFile);

          this.jobseekerService.updateCV(cvFormData).subscribe({
            next: () => {
              this.router.navigate(['/jobseeker/dashboard']);
            },
            error: (err) => {
              console.error('Erreur lors de l\'upload du CV :', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout des détails :', err);
      }
    });


  }




}
