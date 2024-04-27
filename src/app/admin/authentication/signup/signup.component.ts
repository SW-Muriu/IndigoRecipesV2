import { Component } from '@angular/core';
import { HeaderComponent } from '../../../architecture/layout/header/header.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { FooterComponent } from '../../../architecture/layout/footer/footer.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    })
  }

  onSignUp(): void {

  }

  onLogIn(): void {
    let route = `route`;
    this.router.navigate([route]);
  }

}
