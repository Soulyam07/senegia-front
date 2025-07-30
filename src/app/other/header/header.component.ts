import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, Routes} from '@angular/router';
import {AuthService} from '../../shared/services/auth/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService,private routes:Router) {
  }

  loggedDem: boolean = false;
  emailOrg: string | null = null;
  emailDem: string | null = null;

  ngOnInit() {

    // this.loggedDem = this.authService.getLoggedInDem();
    // console.log(this.loggedDem);

    // this.emailOrg = this.authService.getUsernameOr();
    // this.emailDem =this.authService.getUsernameDem();
    // console.log(this.emailOrg);
    // if (this.authService.getUsernameDem() || this.authService.getUsernameOr() ) {
    //   this.loggedDem = true;
    //   // console.log("email dem");
    // }
    //
    // // if(this.authService.getUsernameOr()){
    // //     this.loggedOrg = true;
    // // }
    this.authService.loggedIn$.subscribe((loggedIn: boolean) => {
      this.loggedDem = loggedIn;
      this.emailOrg = this.authService.getUsernameOr();
      this.emailDem = this.authService.getUsernameDem();
    });


  }

  signout(){
    this.authService.signOut();




  }
}
