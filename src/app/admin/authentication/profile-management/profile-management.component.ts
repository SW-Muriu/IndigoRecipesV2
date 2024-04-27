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
  @Input() userName = 'John Doe'; // Input property for user name
  @Output() selectedItem = new EventEmitter<string>();
  

  menuItems: UserMenuItem[] = [
    { label: 'Personal Information', selected: true },
    { label: 'Change Password', selected: false }
  ];

  onMenuItemClick(item: UserMenuItem) {
    this.menuItems.forEach(i => i.selected = false);
    item.selected = true;
    this.selectedItem.emit(item.label);
  }

  constructor(
    private fb: FormBuilder,
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required],],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onAction1(): void {

  }

}
