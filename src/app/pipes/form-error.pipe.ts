import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formError',
  standalone: true
})
export class FormErrorPipe implements PipeTransform {
  transform(errors?: ValidationErrors | null, fieldLabel: string = 'This field'): string {
    if (!errors) return '';

    const errorMessages: { [key: string]: string } = {
      required: `${fieldLabel} is required`,
      minlength: `${fieldLabel} must be at least ${errors?.['minlength']?.requiredLength} characters`,
      noItemSelected: `At least one item must be selected`,
	  duplicateItem: `Items of ${fieldLabel} must be unique`
    };

    const firstError = Object.keys(errors)[0];
    const message = errorMessages[firstError] || 'Invalid input';
    
    return message;
  }
} 