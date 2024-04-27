import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackbar: MatSnackBar,
  ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  /** Show Success and Error notifications */
  showNotificationMessage(
    message: string,
    type: 'snackbar-danger' | 'snackbar-success' | 'login-snackbar',
    duration: number = 500,
  ): void {
    this.snackbar.open(message, 'X', {
      duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [type]
    });
  }
}
