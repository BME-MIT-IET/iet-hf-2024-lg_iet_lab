import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss'
})
export class ProgressSpinnerComponent {
  @Input({
    alias: 'progress-spinner-displayed',
    transform: booleanAttribute
  })displayed = false;
}
