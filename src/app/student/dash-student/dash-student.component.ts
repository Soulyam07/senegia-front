import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {CoursService} from '../../shared/services/cours/cours.service';
import {StudentService} from '../shared/services/student.service';
import {SubCourService} from '../shared/services/subCour.service';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {SaveCourService} from '../shared/services/saveCour.service';

@Component({
  selector: 'app-dash-student',
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './dash-student.component.html',
  styleUrl: './dash-student.component.scss'
})
export class DashStudentComponent implements OnInit {

  cours: any; // ta liste initiale

  idStudent!:any;
  student!:any;

  constructor(private authService:AuthService,private courService:CoursService,private studentService:StudentService,
              private subCourService:SubCourService,private saveCourService:SaveCourService,private routes:Router) {
  }

  saveCour:Set<number> = new Set();
  saveCour2:any;
  subCours2:any;
  subCours:Set<number> = new Set();

  ngOnInit() {

    this.studentService.viewByEmail(this.authService.getUsernameStd()).subscribe(
      res=>{
        this.student = res;
        this.idStudent = this.student.id;

        this.saveCourService.viewSaveByStudent(this.idStudent).subscribe(saved => {
          this.saveCour2 = saved;
          console.log(saved);
          if(saved && Array.isArray((saved))){
            const ids = saved.map((s:any)=>Number(s.id));
            console.log(ids);
            this.saveCour = new Set(ids);
          }
          else{
            this.saveCour = new Set();
          }
        })

        this.subCourService.viewSubByStd(this.idStudent).subscribe(sub =>{
          this.subCours2 = sub;
          console.log(sub);
          if(sub && Array.isArray(sub)){
            const ids = sub.map((s:any)=>Number(s.course_id));
            this.subJobs = new Set(ids);
          }
          else{
            this.subJobs = new Set();
          }
        })
      }
    )


  }


  isCourSaved(idCour:number):boolean{
    const exists = this.saveCour.has(Number(idCour));

    return exists;
  }

  toggleSaveCour(courId:number):void{
    if(!this.authService.getUsernameStd()){
      this.routes.navigate(['/signin']);
      return;
    }
    if(this.isCourSaved(courId)){
      if(confirm("Voulez vous supprimer cette cour?")){
        this.saveCourService.deleteSave(this.idStudent,courId).subscribe(res=>{
          this.saveCour.delete(courId);
        });
      }
      return;
    }else{

      const formData = new FormData();
      formData.append('idStudent', this.idStudent.toString());
      formData.append('idCour', courId.toString());

      this.saveCourService.saveCour(formData).subscribe(()=>{
        this.saveCour.add(courId);
      })

    }
  }

  subJobs:Set<number> = new Set();
  subscribe(courId:number){
    if(!this.authService.getUsernameStd()){
      this.routes.navigate(['/signin']);
      return;
    }
    const formData = new FormData();
    formData.append('idStudent', this.idStudent.toString());
    formData.append('idCour', courId.toString());

    this.subCourService.subCour(formData).subscribe(()=>{
      this.subJobs.add(Number(courId))
    })

  }

  cancelSub(courId:number){

    if (confirm('Voulez-vous enlever votre inscription ?')) {
      this.subCourService.deleteSub(this.idStudent,courId).subscribe(() => {
        this.subJobs.delete(courId);
      });
    }

  }




}
