import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/base/base.component';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent extends BaseComponent implements OnInit {  
  
  
  constructor(
    protected router: Router,
    protected authService: AuthService) {
    super(router);
    authService = inject(AuthService);
    router = inject(Router);  
  }
  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
      .subscribe((data: any) => {
        if(this.authService.isLoggedIn()){
          this.router.navigate(['/properties']);
        }
        console.log(data);
      });
    }
  }
}