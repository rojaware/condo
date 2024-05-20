import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/base/base.component';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',  
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent extends BaseComponent implements OnInit {  
  
  constructor(
    protected router: Router,
    protected authService: AuthService) {
    super(router);
    authService = inject(AuthService);
    router = inject(Router);  
  }
  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
