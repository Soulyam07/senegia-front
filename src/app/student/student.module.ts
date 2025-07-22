import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { RouterModule } from '@angular/router';
import { ChekoutComponent } from './chekout/chekout.component';
import { DashComponentStudent } from './dash/dash.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SavedcoursComponent } from './savedcours/savedcours.component';
import { AllcoursComponent } from './allcours/allcours.component';
import { CoursComponent } from './cours/cours.component';
import { SubcripComponent } from './subcrip/subcrip.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     RouterModule, 
    StudentRoutingModule
  ]
})
export class StudentModule { }
