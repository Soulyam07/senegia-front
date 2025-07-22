import { Component } from '@angular/core';
import { StudentHeaderComponent } from "../../shared/student-header/student-header.component";
import { FooterComponent } from "../../../other/footer/footer.component";
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-student-layout',
  imports: [StudentHeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss'
})
export class StudentLayoutComponent {

}
