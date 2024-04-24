import { Component } from '@angular/core';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
login() {
throw new Error('Method not implemented.');
}

  signInForm: FormGroup
  signUpFom: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }); 

    this.signUpFom = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required],],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
  }

}
