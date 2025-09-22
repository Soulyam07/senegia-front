import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrgService} from '../../shared/services/job/org.service';
import {AuthService} from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-register-organizer',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-organizer.component.html',
  styleUrl: './register-organizer.component.scss'
})
export class RegisterOrganizerComponent {

  orgForm!:FormGroup;

  constructor(private router:Router,private fb:FormBuilder,private orgService:OrgService,private authService:AuthService) {

    this.orgForm = this.fb.group({
      userEntity:['',Validators.required],
      name:['',Validators.required],
      email:['',Validators.required,Validators.email],
      mobile:['',Validators.required],
      contactP:['',Validators.required],
      password:['',Validators.required],
      companySize:['',Validators.required],
      website:['',Validators.required],
      country:['',Validators.required],
      state:['',Validators.required],
      city:['',Validators.required],
      address:['',Validators.required],
      zipCode:['',Validators.required],
      description:['',Validators.required],
      image:['',Validators.required],
      agreed:['',Validators.required],

    })
  }

  image!:File;
  onFileSelected(event: Event) {
    const fileInput:any  = event.target as HTMLInputElement;
    if (fileInput.files.length > 0) {
      this.image = fileInput.files[0];

    }
  }

  onTermsChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.orgForm.get("agreed")?.setValue(isChecked ? 1 : 0);
  }

  createEntreprise(){
    let formData = new FormData();
    formData.append('image', this.image);
    formData.append('entity',this.orgForm.controls['userEntity']?.value);
    formData.append('name',this.orgForm.controls['name']?.value);
    formData.append('email',this.orgForm.controls['email']?.value);
    formData.append('mobileNumber',this.orgForm.controls['mobile']?.value);
    formData.append('contact',this.orgForm.controls['contactP']?.value);
    formData.append('password',this.orgForm.controls['password']?.value);
    formData.append('companySize',this.orgForm.controls['companySize']?.value);
    formData.append('country',this.orgForm.controls['country']?.value);
    formData.append('website',this.orgForm.controls['website']?.value);
    formData.append('state',this.orgForm.controls['state']?.value);
    formData.append('city',this.orgForm.controls['city']?.value);
    formData.append('address',this.orgForm.controls['address']?.value);
    formData.append('zipCode',this.orgForm.controls['zipCode']?.value);
    formData.append('description',this.orgForm.controls['description']?.value);
    formData.append('agreed',this.orgForm.controls['agreed']?.value);

    this.orgService.register(formData).subscribe(
      res=>{
        this.authService.setUsernameOr(this.orgForm.controls['email']?.value);
        this.authService.setLoggedInOr(true);
        this.router.navigate(['/organiser/dashboard']);
      },
      err => {
        console.log(err);
      }
    )

  }

}
