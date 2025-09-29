import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StudentService} from '../shared/services/student.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-details-student',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './details-student.component.html',
  styleUrl: './details-student.component.scss'
})
export class DetailsStudentComponent implements OnInit {
  constructor(private studentService: StudentService,private fb:FormBuilder, private router:Router) {
    this.studentForm = this.fb.group({
      idStudent : ['',Validators.required],
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
    return this. studentForm.get('educations') as FormArray;
  }

  get experience() {
    return this. studentForm.get('experience') as FormArray;
  }

  addEducation() {
    this.educations.push(this.fb.group({
      qualification: ['', Validators.required],
      university: ['', Validators.required],
      field: ['', Validators.required],
      year:['', Validators.required],
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
      year:['', Validators.required],
    }));
  }

  removeExperience(index: number) {
    this.experience.removeAt(index);
  }

  student!:any;
  studentForm: FormGroup;
  idStudent!: any;
  ngOnInit() {

    this.studentService.viewByEmail(this.studentService.getEmail()).subscribe(
      result => {
        this.student = result;

        this.idStudent = this.student.id;
        // console.log(this.student);

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
    const educations = this.studentForm.get('educations')?.value ?? [];
    const experiences = this.studentForm.get('experience')?.value ?? [];

    console.log(experiences)

    if (!this.idStudent) {
      console.error("ID candidat manquant");
      return;
    }

    const detailsFormData = new FormData();
    detailsFormData.append('idStudent', this.idStudent);
    detailsFormData.append('educations', JSON.stringify(educations));
    detailsFormData.append('experiences', JSON.stringify(experiences));


    this.studentService.addDetails(detailsFormData).subscribe({
      next: () => {
        this.router.navigate(['/student/dash']);

        // if (this.selectedFile) {
        //   const cvFormData = new FormData();
        //   cvFormData.append('idStudent', this.idStudent);
        //   cvFormData.append('cv_candidat', this.selectedFile);
        //
        //   this.studentService.updateCV(cvFormData).subscribe({
        //     next: () => {
        //       this.router.navigate(['/jobseeker/dashboard']);
        //     },
        //     error: (err) => {
        //       console.error('Erreur lors de l\'upload du CV :', err);
        //     }
        //   });
        // }
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout des détails :', err);
      }
    });


  }

}
