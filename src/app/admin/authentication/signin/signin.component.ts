import { Component, OnDestroy } from '@angular/core';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../architecture/layout/header/header.component';
import { ProfileManagementComponent } from '../profile-management/profile-management.component';
import { RecipeHolderComponent } from '../../../recipe-management/recipe-holder/recipe-holder.component';
import { Recipe } from '../../../architecture/utils/interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservices/auth.service';
import { HttpParams } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../../architecture/services/notification/notification.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    ProfileManagementComponent,
    RecipeHolderComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  signInForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authManService: AuthService,
    private snackbarManService: NotificationService,
  ) {
    this.signInForm = this.fb.group({
      userNameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onLogin(): void {
    const params = new HttpParams()
      .set("userNameorEmail", this.signInForm.value.userNameOrEmail)
    this.authManService
      .logInUser(this.signInForm.value, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (!!res && res.statusCode == 200) {
            sessionStorage.setItem('username', res.entity.userName);
            sessionStorage.setItem('firstName', res.entity.firstName);
            sessionStorage.setItem('lastName', res.entity.lastName);
            sessionStorage.setItem('email', res.entity.email);
            let route = `/home`;
            this.router.navigate([route]);
            this.snackbarManService.showNotificationMessage(res.message, "login-snackbar");
          } else {
            this.snackbarManService.showNotificationMessage(res.message, "login-snackbar");
          }
        },
        error: (err) => {
          this.snackbarManService.showNotificationMessage("Server Error!!", "snackbar-danger");
        },
        complete: () => { }
      })
  }

}
