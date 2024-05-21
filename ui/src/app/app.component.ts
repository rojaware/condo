import { Component, isDevMode } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular 17 Condo application';
  env = environment;
  ngOnInit() {
    if (isDevMode()) {
        console.log('Development!');
    } else {
        console.log('Production!');
    }
  }
  
}
