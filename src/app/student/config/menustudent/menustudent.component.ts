import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menustudent',
  imports: [
     CommonModule,RouterLink
  ],
  standalone: true,
  templateUrl: './menustudent.component.html',
  styleUrl: './menustudent.component.scss'
})
export class MenustudentComponent {
  @Input() userName: string = 'Shubham Khantwal';
  @Input() userEmail: string = 'abcdf...fsdfsd.com';
  @Input() userPhone: string = '+91 1234567890';
  @Input() userPhoto: string = '';
}
