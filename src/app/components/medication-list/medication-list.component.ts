import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AddMedicationModalComponent } from '@components/add-medication-modal/add-medication-modal.component';
import { ButtonComponent } from '@components/button/button.component';
import { SearchMedicationComponent } from '@components/search-medication/search-medication.component';
import { MedicationService } from '@services/medication.service';
@Component({
  selector: 'app-medication-list',
  imports: [
    SearchMedicationComponent,
	ButtonComponent,
	AddMedicationModalComponent
  ],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.scss'
})
export class MedicationListComponent {
  medications = toSignal(inject(MedicationService).medications$);
  searchTerm = signal('');

  filteredMedications = computed(() => {
    return this.medications()?.filter(medication => medication.name.toLowerCase().includes(this.searchTerm().toLowerCase()));
  });

  showModal = signal(false);

  toggleModal(show: boolean): void {
    this.showModal.set(show);
  }
  
}
