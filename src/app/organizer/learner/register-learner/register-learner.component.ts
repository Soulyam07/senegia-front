import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register-learner',
  imports: [],
  templateUrl: './register-learner.component.html',
  styleUrl: './register-learner.component.scss'
})
export class RegisterLearnerComponent implements OnInit{

  learnerForm!:FormGroup;

  // constructor() {
  // }

  ngOnInit() {
  }

}
