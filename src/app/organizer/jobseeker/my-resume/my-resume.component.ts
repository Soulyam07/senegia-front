import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {JobseekerService} from '../../../shared/services/job/jobseeker.service';
import {CandidatureService} from '../../../shared/services/job/candidature.service';
import {AuthService} from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-my-resume',
  imports: [
    NgIf,
    RouterLink,
    NgForOf,
    DatePipe
  ],
  templateUrl: './my-resume.component.html',
  styleUrl: './my-resume.component.scss'
})
export class MyResumeComponent implements OnInit {
  jobSeeker:any;
  appliedJobs2:any=[];
  constructor(private jobseekerService:JobseekerService,private candidatureService:CandidatureService,
              private authService:AuthService) {
  }

  ngOnInit() {
    this.jobseekerService.viewByEmail(this.authService.getUsernameDem()).subscribe(
      res=>{
        this.jobSeeker = res;
        console.log(this.jobSeeker);
        this.candidatureService.viewByCandidat(this.jobSeeker.id).subscribe(
          res=>{
            this.appliedJobs2 = res;
            console.log(this.appliedJobs2);
          }
        )
      }
    )
  }
}
