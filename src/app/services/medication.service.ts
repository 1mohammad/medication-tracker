import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Medication } from '../models/medication.model';

const MEDICATIONS_STORAGE_KEY = 'medications';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private storageService = inject(StorageService);

  readonly dosageUnits: readonly string[] = [
    'Capsules',
    'Tablets',
    'Applications',
    'Drops',
    'Milligrams',
    'Micrograms',
  ];

  readonly weekDays: readonly string[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];

  private medicationsSubject = new BehaviorSubject<Medication[]>([]);
  medications$: Observable<Medication[]> = this.medicationsSubject.asObservable();

  constructor() {
    this.loadMedications();
  }

  private loadMedications(): void {
    const storedMedications = this.storageService.get<Medication[]>(MEDICATIONS_STORAGE_KEY) || [];
    this.medicationsSubject.next(storedMedications);
  }

  addMedication(medication: Medication): void {
    const updatedMedications = [...this.medicationsSubject.value, medication];
    this.saveAndUpdateMedications(updatedMedications);
  }

  private saveAndUpdateMedications(medications: Medication[]): void {
    this.storageService.save(MEDICATIONS_STORAGE_KEY, medications);
    this.medicationsSubject.next(medications);
  }

}
