import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class ValidatorService {

	atLeastOneSelected(control: AbstractControl): ValidationErrors | null {
		const values = control.value as boolean[];
		return values.some(value => value) ? null : { noDaySelected: true };
	}

}
