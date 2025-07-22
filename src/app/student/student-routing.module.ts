import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponentStudent } from './dash/dash.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SavedcoursComponent } from './savedcours/savedcours.component';
import { AllcoursComponent } from './allcours/allcours.component';
import { CoursComponent } from './cours/cours.component';
import { SubcripComponent } from './subcrip/subcrip.component';
import { ChekoutComponent } from './chekout/chekout.component';
import { SessionsComponent } from './sessions/sessions.component';
import { CoursdetailsComponent } from './coursdetails/coursdetails.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';

const routes: Routes = [ 
  {
path: '',
  component: StudentLayoutComponent,
  children: [ 
  { path: '', redirectTo: 'dash', pathMatch: 'full' },
  { path: 'dash', component: DashComponentStudent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'saved', component: SavedcoursComponent },
  { path: 'allcours', component: AllcoursComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'subcrip', component: SubcripComponent },
  { path: 'courchek', component: ChekoutComponent },
  { path: 'session', component: SessionsComponent },
  { path: 'profil', component: ChekoutComponent },
  { path: 'detail', component: CoursdetailsComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
