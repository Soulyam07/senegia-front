import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth/auth.service';
import {Router} from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';





@Component({
  selector: 'app-signin',
  standalone:true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  signinFrom:FormGroup;

  errorMessage = '';
  successMessage = '';

  constructor(private formBuilder:FormBuilder,private routes:Router,private authService:AuthService) {

    this.signinFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',Validators.required]
    })
  }

  email!:string;
  password!:string;

  connexion(){

    // this.email = this.signinFrom.get('email')?.value;
    // this.pwd = this.signinFrom.get('pwd')?.value;
    if(this.signinFrom.invalid) return;
    const {email,password} = this.signinFrom.value;

    let formdata = new FormData();
    formdata.append('email',email);
    formdata.append('password',password);

    // this.authService.loginOr(formdata).subscribe({
    //   next: () => {
    //     console.log('Connexion réussie !');
    //     this.successMessage = 'Connexion réussie !';
    //     this.errorMessage = '';
    //     this.authService.setLoggedInOr(true);
    //     this.authService.setUsernameOr(this.signinFrom.get('email')?.value);
    //
    //     this.routes.navigate(['/organiser/dashboard']);
    //     // location.reload();
    //   },
    //   error: (err) => {
    //     this.authService.loginCan(formdata).subscribe({
    //       next: () => {
    //         console.log('Connexion Demandeur réussie !');
    //         this.successMessage = 'Connexion réussie !';
    //         this.errorMessage = '';
    //         this.authService.setLoggedInDem(true); // À adapter selon ton authService
    //         this.authService.setUsernameDem(this.signinFrom.get('email')?.value);
    //
    //         this.routes.navigate(['/jobseeker/dashboard']);
    //         // location.reload();
    //       },
    //       error: () => {
    //         this.errorMessage = 'Échec de connexion. Vérifiez vos identifiants.';
    //         this.successMessage = '';
    //       }
    //     });
    //   }
    // });
    this.authService.loginOr(formdata).subscribe({
      next: () => {
        this.successMessage = 'Connexion réussie !';
        this.authService.setUsernameOr(this.signinFrom.get('email')?.value);
        this.routes.navigate(['/organiser/dashboard']);
      },
      error: () => {
        this.authService.loginCan(formdata).subscribe({
          next: () => {
            this.successMessage = 'Connexion réussie !';
            this.authService.setUsernameDem(this.signinFrom.get('email')?.value);
            this.routes.navigate(['/jobseeker/dashboard']);
          },
          error: () => {
            this.errorMessage = 'Échec de connexion. Vérifiez vos identifiants.';
          }
        });
      }
    });


    // this.routes.navigate(['/organiser/dashboard']);

  }



}
