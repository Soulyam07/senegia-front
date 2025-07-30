import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentLayoutComponent} from './layouts/student-layout/student-layout.component';
import {PurchaseComponent} from './purchase/purchase.component';
import {SavedcoursComponent} from './savedcours/savedcours.component';
import {AllcoursComponent} from './allcours/allcours.component';
import {CoursComponent} from './cours/cours.component';
import {SubcripComponent} from './subcrip/subcrip.component';
import {ChekoutComponent} from './chekout/chekout.component';
import {SessionsComponent} from './sessions/sessions.component';
import {CoursdetailsComponent} from './coursdetails/coursdetails.component';
import {DetailsStudentComponent} from './details-student/details-student.component';
import {DashStudentComponent} from './dash-student/dash-student.component';
// import { DashComponentStudent } from '../../../../senegia-front2/src/app/student/dash/dash.component';
// import { PurchaseComponent } from './purchase/purchase.component';
// import { SavedcoursComponent } from './savedcours/savedcours.component';
// import { AllcoursComponent } from './allcours/allcours.component';
// import { CoursComponent } from './cours/cours.component';
// import { SubcripComponent } from './subcrip/subcrip.component';
// import { ChekoutComponent } from '../../../../senegia-front/src/app/student/chekout/chekout.component';
// import { SessionsComponent } from './sessions/sessions.component';
// import { CoursdetailsComponent } from '../../../../senegia-front/src/app/student/coursdetails/coursdetails.component';
// import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';

const routes: Routes = [
  {
path: '',
  component: StudentLayoutComponent,
  children: [
  { path: '', redirectTo: 'dash', pathMatch: 'full' },
  { path: 'dash', component: DashStudentComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'saved', component: SavedcoursComponent },
  { path: 'allcours', component: AllcoursComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'subcrip', component: SubcripComponent },
  { path: 'courchek', component: ChekoutComponent },
  { path: 'session', component: SessionsComponent },
    {path:'studentDetails',component:DetailsStudentComponent},
  // { path: 'profil', component: ChekoutComponent },
  { path: 'detail', component: CoursdetailsComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
