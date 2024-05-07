import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, inject, Input, numberAttribute } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatSnackBarLabel } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, MatSnackBarLabel, MatSnackBarModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {

  @Input({
    alias: 'content'
  }) text = "Sample text";

  @Input({
    alias: 'has-button',
    transform: booleanAttribute
  }) hasBtn = false;

  open : boolean = false;

  /**
   * Displays the snackbar with the specified time duration.
   * 
   * Sets the 'open' property to true to display the snackbar.
   * After the specified time duration, sets the 'open' property to false to hide the snackbar.
   * 
   * @param timeInSeconds The duration for which the snackbar should be displayed, in seconds.
   * @returns {void}
   */
  displaySnackBar(timeInSeconds : number)
  {
      this.open = true;
      setTimeout(() => {
         this.open = false;
      },timeInSeconds*1000);
  }

}
