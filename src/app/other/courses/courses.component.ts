import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {CoursService} from '../../shared/services/cours/cours.service';
import {SaveCourService} from '../../student/shared/services/saveCour.service';
import {StudentService} from '../../student/shared/services/student.service';
import {AuthService} from '../../shared/services/auth/auth.service';


@Component({
  selector: 'app-courses',
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent  implements OnInit {

  constructor(private courService:CoursService,private routes:Router,private saveCourService:SaveCourService,
              private studentService:StudentService,private authService:AuthService) {
  }

  categories:any;
  cours:any;
  saveCour:Set<number> = new Set();
  idStudent:any;
  student:any;

  ngOnInit() {

    this.studentService.viewByEmail(this.authService.getUsernameStd()).subscribe(
      res=>{
      this.student = res;
        this.idStudent = this.student.id;

        this.saveCourService.viewSaveByStudent(this.idStudent).subscribe(saved => {
          console.log(saved);
          if(saved && Array.isArray((saved))){
            const ids = saved.map((s:any)=>Number(s.course_id));
            console.log(ids);
            this.saveCour = new Set(ids);
          }
          else{
            this.saveCour = new Set();
          }
        })
      }
    )

    this.courService.getCategory().subscribe(
      res=>{
        this.categories = res;
        // console.log(this.categories);
      }
    )

    this.courService.getAllCours().subscribe(
      res=>{
        this.cours = res;
        console.log(this.cours);
      }
    )

    this.loadCours();




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

  allCours:any;
  typeChange:any[]=[];
  priceChange:any[]=[];
  loadCours() {
    this.courService.getAllCours().subscribe((response: any) => {
      this.allCours = (response as any[]).filter((cour: any) => {
        let include = true;

        if (this.typeChange.length > 0) {
          include = this.typeChange.some((val) => {
            return cour.category_id === val || cour.category_id?.toString() === val;
          });
        }


        if (include && this.priceChange.length > 0) {
          include = this.priceChange.some((val) => {
            if (val === "Payant") {
              return cour.price != null && cour.price > 0;
            }
            if (val === "Gratuit") {
              return cour.price == null;
            }
            return true;
          });
        }

        return include;
      });
    });
  }

  onTypeChange(value: string, event: any) {
    if (event.target.checked) {
      this.typeChange.push(value);
    } else {
      this.typeChange = this.typeChange.filter(v => v !== value);
    }

    // relancer le filtre après changement
    this.loadCours();
  }


  onPriceChange(value: string, event: any) {
    if (event.target.checked) {
      this.priceChange.push(value);
    } else {
      this.priceChange = this.priceChange.filter(v => v !== value);
    }

    // relancer le filtre après changement
    this.loadCours();
  }

  details(id:number){
      this.routes.navigate(['/courses',id]);
  }






}
