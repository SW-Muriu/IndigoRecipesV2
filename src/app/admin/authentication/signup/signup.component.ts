import { Component } from '@angular/core';
import { HeaderComponent } from '../../../architecture/layout/header/header.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { FooterComponent } from '../../../architecture/layout/footer/footer.component';
import { NotificationService } from '../../../architecture/services/notification/notification.service';
import { AuthService } from '../../services/authservices/auth.service';
import { Subject, takeUntil } from 'rxjs';

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
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authManService: AuthService,
    private snackbarManService: NotificationService,
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


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  onSignUp(): void {
    this.authManService
      .registerUser(this.signupForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            const username = res.entity.userName;
            const email = res.entity.email;
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('firstName', this.signupForm.value.firstName);
            sessionStorage.setItem('lastName', this.signupForm.value.lastName);
            let route = '/home';
            this.router.navigate([route]);
            this.snackbarManService.showNotificationMessage(res.message, "snackbar-success");
          } else {
            this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger");
          }
        },
        error: (err) => {
          this.snackbarManService.showNotificationMessage(err.message, "snackbar-danger");
        },
        complete: () => {
          // this.fetchAllUsers();
        }
      });
  }



}
