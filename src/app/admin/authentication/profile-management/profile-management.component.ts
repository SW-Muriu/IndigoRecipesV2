import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { HeaderComponent } from '../../../architecture/layout/header/header.component';
import { MatIconButton } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FooterComponent } from '../../../architecture/layout/footer/footer.component';

export interface UserMenuItem {
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent, 
    FooterComponent,
    
  ],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss'
})
export class ProfileManagementComponent {

  profileForm: FormGroup

  constructor(
    private fb: FormBuilder,
  ) {
    this.profileForm = this.fb.group({
      firstName: [sessionStorage.getItem('firstName'), [Validators.required]],
      lastName: [sessionStorage.getItem('lastName'), [Validators.required]],
      email: [sessionStorage.getItem('email'), [Validators.email, Validators.required]],
      username: [sessionStorage.getItem('username'), [Validators.required],],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

 

}
