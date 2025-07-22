import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {HeaderComponent} from './other/header/header.component';
import {FooterComponent} from './other/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [
     RouterOutlet,
       HeaderComponent,
      FooterComponent
  
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'senegia-front';
    showMainLayout = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // ✅ Si l’URL commence par /student, on cache le header/footer
        this.showMainLayout = !event.urlAfterRedirects.startsWith('/student');
      }
    });
  }
}
