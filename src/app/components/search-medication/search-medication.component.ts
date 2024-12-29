import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-medication',
  templateUrl: './search-medication.component.html',
  styleUrls: ['./search-medication.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SearchMedicationComponent {
  searchChange = output<string>();
  searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchChange.emit(value || '');
    });
  }
}
