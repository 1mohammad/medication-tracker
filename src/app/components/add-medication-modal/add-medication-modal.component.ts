import { Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MedicationService } from '@services/medication.service';
import { Medication } from '@models/medication.model';
import { ButtonComponent } from '@components/button/button.component';
import { ModalComponent } from '@components/modal/modal.component';
import { FormErrorPipe } from '@pipes/form-error.pipe';
import { ValidatorService } from '@services/validator.service';

@Component({
  selector: 'app-add-medication-modal',
  templateUrl: './add-medication-modal.component.html',
  styleUrls: ['./add-medication-modal.component.scss'],
  standalone: true,
  imports: [
	CommonModule, 
	ModalComponent, 
	ReactiveFormsModule,
	ButtonComponent,
	FormErrorPipe
  ]
})
export class AddMedicationModalComponent {
  // Dependencies
  private readonly medicationService = inject(MedicationService);
  private readonly fb = inject(FormBuilder);
  private readonly validator = inject(ValidatorService);

  // Inputs/Outputs
  isOpen = input<boolean>(false);
  closeModal = output<void>();

  // Form
  medicationForm!: FormGroup;

  // Constants/Data
  readonly dosageUnits = this.medicationService.dosageUnits;
  readonly weekDays = this.medicationService.weekDays;

  // Form Getters
  get selectedDays(): FormArray {
    return this.medicationForm.get('selectedDays') as FormArray;
  }

  get timeSlots(): FormArray {
    return this.medicationForm.get('timeSlots') as FormArray;
  }

  private isFirstOpen = true;

  constructor() {
    this.initForm();
    
    effect(() => {
      if(this.isOpen()) {
        if (this.isFirstOpen) {
          this.isFirstOpen = false;  // Skip first time since constructor handled it
          return;
        }
        this.initForm();
      }
    });
  }

  private initForm(): void {
	console.log('initForm');
	
    this.medicationForm = this.fb.group({
      medicationName: ['', [Validators.required, Validators.minLength(3)]],
      dosage: ['', [Validators.required, Validators.min(0.1)]],
      dosageUnit: ['', Validators.required],
      selectedDays: this.fb.array(
        this.weekDays.map(() => false),
        [this.validator.atLeastOneSelected]
      ),
      timeSlots: this.fb.array([
        this.createTimeControl()
      ],[this.validator.notDuplicateItem])
    });
  }

  private createTimeControl() {
    return this.fb.control('', Validators.required);
  }

  private getSelectedDays(): string[] {
    const selectedDaysValue = this.selectedDays.value
      .map((selected: boolean, index: number) => selected ? this.weekDays[index] : '')
      .filter((day: string) => day !== '');
    
    return selectedDaysValue.length === this.weekDays.length ? ['Every day'] : selectedDaysValue;
  }


  addTimeSlot(): void {
    const timeSlots = this.timeSlots;
	
    if (timeSlots.length < 5) {
      timeSlots.push(this.createTimeControl());
    }
  }

  toggleDay(index: number): void {
    const currentValue = this.selectedDays.at(index).value;
    this.selectedDays.at(index).setValue(!currentValue);
    
    this.selectedDays.markAsTouched();
  }


  /**
   * Handles form submission for adding a new medication.
   * Validates the form, creates a medication object from form values,
   * and adds it to the medication service. Resets form and closes modal on success.
   */
  onSubmit(): void {
    this.medicationForm.markAllAsTouched();

    if (!this.medicationForm.valid) {
      return;
    }

    const { medicationName, dosage, dosageUnit, timeSlots } = this.medicationForm.value;
    const medication: Medication = {
      id: Date.now(),
      name: medicationName,
      dosage: `${dosage} ${dosageUnit}`,
      schedule: {
        days: this.getSelectedDays(),
        times: timeSlots
      },
      lastUpdated: new Date().toLocaleDateString()
    };

    this.medicationService.addMedication(medication);
    this.medicationForm.reset();
    this.closeModal.emit();
  }
}

