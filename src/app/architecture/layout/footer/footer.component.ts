import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
 
  mngForm: FormGroup

  constructor(
    private fb: FormBuilder, 
    private notificationManService: NotificationService,
  ) {
    this.mngForm = this.fb.group({
      response: ['', [Validators.required, Validators.maxLength(3000)]],
    })
  }

  onSendEmail(): void {
    if (this.mngForm.value.response != null) {
      const username = sessionStorage.getItem("username");
      this.notificationManService.showNotificationMessage(`Thank you ${username} for your feedback`, 'snackbar-success');
    } else {
      this.notificationManService.showNotificationMessage(`Kindly fill the form`, 'snackbar-success');
    }
  }
}
