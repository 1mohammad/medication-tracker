import { Component } from '@angular/core';
import { SearchMedicationComponent } from '@components/search-medication/search-medication.component';

@Component({
  selector: 'app-medication-list',
  imports: [
	SearchMedicationComponent
  ],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.scss'
})
export class MedicationListComponent {

}
