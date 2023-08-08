import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shared-snackbar-message',
  templateUrl: './shared-snackbar-message.component.html',
  styleUrls: ['./shared-snackbar-message.component.scss']
})
export class SharedSnackbarMessageComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Input() message: string;

  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(): void {
    this.snackBar.open(this.message, 'Close', {
      duration: 3000,
    });
  }

}
