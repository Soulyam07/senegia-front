import {Component, OnInit} from '@angular/core';
import {JobseekerService} from '../../../shared/services/job/jobseeker.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-job',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-job.component.html',
  styleUrl: './register-job.component.scss'
})
export class RegisterJobComponent implements OnInit {

  candidatForm!: FormGroup;
  constructor(private jobseekerService:JobseekerService,private router:Router,private fb:FormBuilder) {
    this.candidatForm = this.fb.group({
      name :['',Validators.required],
      email :['',Validators.required,Validators.email],
      password:['',Validators.required],
      telephone:['',Validators.required],
      address:['',Validators.required],
      date_naissance:['',Validators.required],
      image:['',Validators.required],
    })
  }


  image!:File;
  onFileSelected(event: Event) {
    const fileInput:any  = event.target as HTMLInputElement;
    if (fileInput.files.length > 0) {
      this.image = fileInput.files[0];

    }
  }

  ngOnInit() {

  }

  createCandidat(){

    let formData = new FormData();
    formData.append('name', this.candidatForm.controls['name']?.value);
    formData.append('email', this.candidatForm.controls['email']?.value);
    formData.append('password', this.candidatForm.controls['password']?.value);
    formData.append('telephone', this.candidatForm.controls['telephone']?.value);
    formData.append('address', this.candidatForm.controls['address']?.value);
    formData.append('date_naissance',this.candidatForm.controls['date_naissance']?.value);
    formData.append('image',this.image);
    // console.log(this.candidatForm.controls);

    this.jobseekerService.register(formData).subscribe(
      res=>{
          this.jobseekerService.setEmail(this.candidatForm.controls['email']?.value);
          this.router.navigate(['/jobseeker/details']);
      },
      err => {
        console.log(err);
      }
    )

  }


}
