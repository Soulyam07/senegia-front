import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JobseekerService} from '../../shared/services/job/jobseeker.service';
import {Router} from '@angular/router';
import {StudentService} from '../shared/services/student.service';

@Component({
  selector: 'app-register-student',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.scss'
})
export class RegisterStudentComponent implements OnInit{

  studentForm!:FormGroup;

  constructor(private studentService:StudentService,private router:Router,private fb:FormBuilder) {
    this.studentForm = this.fb.group({
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
    formData.append('name', this.studentForm.controls['name']?.value);
    formData.append('email', this.studentForm.controls['email']?.value);
    formData.append('password', this.studentForm.controls['password']?.value);
    formData.append('telephone', this.studentForm.controls['telephone']?.value);
    formData.append('address', this.studentForm.controls['address']?.value);
    formData.append('date_naissance',this.studentForm.controls['date_naissance']?.value);
    formData.append('image',this.image);
    // console.log(this.studentForm.controls);

    this.studentService.register(formData).subscribe(
      res=>{
        this.studentService.setEmail(this.studentForm.controls['email']?.value);
        this.router.navigate(['/student/studentDetails']);
      },
      err => {
        console.log(err);
      }
    )

  }


}
