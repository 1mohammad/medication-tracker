import { Component } from '@angular/core';
import { MedicationListComponent } from './components/medication-list/medication-list.component';

@Component({
  selector: 'app-root',
  imports: [MedicationListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'medical-tracker';
}
