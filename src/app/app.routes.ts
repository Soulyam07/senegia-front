import { Routes } from '@angular/router';

import {DashComponent} from './organizer/jobseeker/dashJob/dash.component';
import {ManagedJobComponent} from './organizer/jobseeker/managed-job/managed-job.component';
import {DashPrincipComponent} from './organizer/dash-princip/dash-princip.component';
import {DashLearnerComponent} from './organizer/learner/dash-learner/dash-learner.component';
import {MyCourseComponent} from './organizer/learner/my-course/my-course.component';
import {MyWebinarComponent} from './organizer/learner/my-webinar/my-webinar.component';
import {MyEarningComponent} from './organizer/learner/my-earning/my-earning.component';
import {SigninComponent} from './other/signin/signin.component';
import {RegisterOrganizerComponent} from './organizer/register-organizer/register-organizer.component';
import {RegisterLearnerComponent} from './organizer/learner/register-learner/register-learner.component';
import {RegisterStudentComponent} from './student/register-student/register-student.component';
import {RegisterJobComponent} from './organizer/jobseeker/register-job/register-job.component';
import {HomeComponent} from './other/home/home.component';

export const routes: Routes = [
  { path: '',component:HomeComponent},
  { path:'signin',component:SigninComponent},
  { path:'organizer/register',component:RegisterOrganizerComponent},
  {path: 'educator/register',component:RegisterLearnerComponent},
  {path:'student/register',component:RegisterStudentComponent},
  {path:'jobseeker/register',component:RegisterJobComponent},
  { path:'organiser/dashboard',component:DashPrincipComponent},
  { path : 'organiser/dash-job',component:DashComponent},
  { path: 'organiser/manager-job',component:ManagedJobComponent},
  { path: 'organizer/dash-learner',component:DashLearnerComponent},
  { path: 'organizer/my-course',component:MyCourseComponent},
  { path: 'organizer/my-webinar',component:MyWebinarComponent},
  { path: 'organizer/my-earning',component:MyEarningComponent}
];
