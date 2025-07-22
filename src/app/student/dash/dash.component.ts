import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenustudentComponent } from "../config/menustudent/menustudent.component";

@Component({
  standalone: true,
  selector: 'app-dash',
  imports: [
    MenustudentComponent
],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponentStudent {
}
