import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BaseComponent } from '@app/base/base.component';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-signup',  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent extends BaseComponent implements OnInit {  
  
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

  public onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.signup(this.signupForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['/login']);
          },
          error: (err) => console.log(err)
        });
    }
  }
  
}
