import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from '../../../shared/services/auth/auth.service';
import {OrgService} from '../../../shared/services/job/org.service';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CoursService} from '../../../shared/services/cours/cours.service';
import {NgForOf, NgIf} from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-my-course',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.scss'
})
export class MyCourseComponent implements OnInit {

  organisation:any;
  companyId :any;

  coursesForm!: FormGroup;
  category:any;
  categoryForm!: FormGroup;
  courSection!: FormGroup;

  constructor(private authService: AuthService,private orgService:OrgService,private fb: FormBuilder,
              private courService:CoursService) {
    this.coursesForm = this.fb.group({
      title: ['', Validators.required],
      price:['', Validators.required],
      description: ['', Validators.required],
      access:['', Validators.required],
      language:['', Validators.required],
      category:['', Validators.required],
      level:['', Validators.required],
      company_id:['', Validators.required],
      image:['',Validators.required],
    });

    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });

    // this.courSection = this.fb.group({
    //   titleC:['', Validators.required],
    //   durationC:['', Validators.required],
    //   totalC:['', Validators.required],
    //   lecons:this.fb.array([])
    // })


  }
  cours:any;
  ngOnInit() {

    this.orgService.getByEmail(this.authService.getUsernameOr()).subscribe(
      res=>{
        this.organisation=res;
        this.companyId=this.organisation.id;
        console.log(this.companyId);
        this.coursesForm.get('company_id')?.setValue(this.companyId);
        this.courService.getCoursByInstructor(this.companyId).subscribe(
          res=>{
            this.cours = res;
            console.log(this.cours);
          }
        )
      }
    );




    this.courService.getCategory().subscribe(res=>{
      this.category=res;
      // console.log(res);

    })

    this.courSection = this.fb.group({
      chapitres: this.fb.array([])   // FormArray des chapitres
    });

    this.addChapitre();
  }
  // get lecons(){
  //   return this.courSection.get('lecons') as FormArray;
  // }
  //
  // addLecons(){
  //   this.lecons.push(this.fb.group({
  //     titleL: ['', Validators.required],
  //     statutL: ['', Validators.required],
  //     contenueL: ['', Validators.required]
  //   }))
  // }
  // removeLecons(index:number){
  //   this.lecons.removeAt(index);
  // }
  get chapitres(): FormArray {
    return this.courSection.get('chapitres') as FormArray;
  }

  // Ajouter un chapitre
  addChapitre() {
    const chapitreGroup = this.fb.group({
      titleC: ['', Validators.required],
      durationC: ['', Validators.required],
      totalC: ['', Validators.required],
      lecons: this.fb.array([]) // chaque chapitre contient son FormArray de leçons
    });

    this.chapitres.push(chapitreGroup);
    this.addLecon(this.chapitres.length - 1); // ajoute 1 leçon par défaut
  }

  // Supprimer un chapitre
  removeChapitre(index: number) {
    this.chapitres.removeAt(index);
  }

  // Récupérer les leçons d’un chapitre
  lecons(iChapitre: number): FormArray {
    return this.chapitres.at(iChapitre).get('lecons') as FormArray;
  }

  // Ajouter une leçon dans un chapitre
  addLecon(iChapitre: number) {
    this.lecons(iChapitre).push(
      this.fb.group({
        title: ['', Validators.required],
        is_preview: [0],
        content: ['']
      })
    );
  }

  // Supprimer une leçon dans un chapitre
  removeLecon(iChapitre: number, iLecon: number) {
    this.lecons(iChapitre).removeAt(iLecon);
  }

  seeCours = true;
  seeSection = false;

  onsubmit(){
    const formData = new FormData();
    formData.append('coursData',JSON.stringify({
      title:this.coursesForm.get('title')?.value,
      description:this.coursesForm.get('description')?.value,
      price:this.coursesForm.get('price')?.value,
      langage:this.coursesForm.get('language')?.value,
      category:this.coursesForm.get('category')?.value,
      access:this.coursesForm.get('access')?.value,
      instructor:this.coursesForm.get('company_id')?.value,
      level:this.coursesForm.get('level')?.value
    }));
    // formData.append('title', this.coursesForm.get('title')?.value);
    // formData.append('description', this.coursesForm.get('description')?.value);
    // formData.append('access', this.coursesForm.get('access')?.value);
    // formData.append('langage', this.coursesForm.get('language')?.value);
    // formData.append('level',this.coursesForm.get('level')?.value);
    // formData.append('category',this.coursesForm.get('category')?.value);
    // formData.append('price',this.coursesForm.get('price')?.value);
    // formData.append('instructor',this.coursesForm.get('company_id')?.value);
    formData.append('image',this.image);
    this.seeCours = false;
        this.seeSection = true;

    // this.courService.addCours(formData).subscribe(
    //   res=>{
    //     this.seeCours = false;
    //     this.seeSection = true;
    //     console.log("Cours save avec succes");
    //   }
    // )

  }
  // onSubmitS() {
  //   // Prépare la structure JSON attendue par le backend
  //   const payload = {
  //     chapitres: [this.courSection.value]  // peut contenir plusieurs chapitres
  //   };
  //
  //   this.courService.addChapitree(payload).subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.error('Erreur:', err);
  //     }
  //   );
  // }

  goback(){
    this.seeCours = true;
    this.seeSection = false;
  }

  showSuccess = false;
  onSubmitCoursAvecChapitres() {
    // const coursData = {
    //   title: this.coursesForm.get('title')?.value,
    //   description: this.coursesForm.get('description')?.value,
    //   access: this.coursesForm.get('access')?.value,
    //   langage: this.coursesForm.get('language')?.value,
    //   level: this.coursesForm.get('level')?.value,
    //   category: this.coursesForm.get('category')?.value,
    //   price: this.coursesForm.get('price')?.value,
    //   instructor: this.coursesForm.get('company_id')?.value,
    //   // ici on envoie directement le tableau des chapitres
    //   chapitres: this.courSection.value.chapitres
    // }
    const formData = new FormData();
    formData.append('coursData',JSON.stringify({
      title:this.coursesForm.get('title')?.value,
      description:this.coursesForm.get('description')?.value,
      price:this.coursesForm.get('price')?.value,
      langage:this.coursesForm.get('language')?.value,
      category:this.coursesForm.get('category')?.value,
      access:this.coursesForm.get('access')?.value,
      instructor:this.coursesForm.get('company_id')?.value,
      level:this.coursesForm.get('level')?.value
    }));

    // const formData1 = new FormData();
    // formData1.append("coursData",JSON.stringify(coursData));
    formData.append("image",this.image);

    console.log("Payload envoyé :", formData.values());

    this.courService.addCoursAvecChapitres(formData).subscribe(
      res => {
        console.log('Cours et chapitres créés avec succès', res);
        // ✅ Fermer le modal Bootstrap
        const modalEl = document.getElementById('exampleModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl)
            || new bootstrap.Modal(modalEl);
          modal.hide();
        }

        // ✅ Afficher notification de succès
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 3000);
        this.seeCours = false;
        this.seeSection = true;
        location.reload();
      },
      err => {
        console.error('Erreur lors de la création du cours ou des chapitres', err);
      }
    );
  }
  image!:File;
  onFileSelected(event: Event) {
    const fileInput:any  = event.target as HTMLInputElement;
    if (fileInput.files.length > 0) {
      this.image = fileInput.files[0];

    }
  }

  deleteCour(id:any){
    if(confirm("Voulez-vous vraiment supprimer ce cour ?")){
      this.courService.deleteCour(id).subscribe({

        next: () => {
        console.log("Offre supprimée avec succès");
          this.courService.getCoursByInstructor(this.coursesForm.get('company_id')?.value).subscribe(
            res=>{
              this.cours = res;
              console.log(this.cours);
            }
          )
      },
        error: (err) => {
        console.error("Erreur lors de la suppression", err);
      }
    });
    } else {
    console.log("Suppression annulée.");
    }
  }





}
