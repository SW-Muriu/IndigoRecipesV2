import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { HeaderComponent } from '../../../architecture/layout/header/header.component';
import { MatIconButton } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FooterComponent } from '../../../architecture/layout/footer/footer.component';
import { NotificationService } from '../../../architecture/services/notification/notification.service';
import { AuthService } from '../../services/authservices/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

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
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private notificationManService: NotificationService,
    private authManService: AuthService,
    private router: Router,
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  handleProfileUpdate(): void {
    this.authManService
      .updateUser(this.profileForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          (res.statusCode == 200) ? this.notificationManService.showNotificationMessage(res.message, "snackbar-success") :
            this.notificationManService.showNotificationMessage(res.message, "snackbar-danger");
        }, 
        error: () => {
          this.notificationManService.showNotificationMessage("Server Error!!", "snackbar-danger");
        }, 
        complete: () => {
          this.router.navigate(['/home']);
        }
      })
  }
}
