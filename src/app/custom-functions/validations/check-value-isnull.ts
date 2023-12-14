import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function CheckForNullValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const validity = value == null || value == 'null' ? 'Invalid' : 'Valid';
    let booleanValue: boolean;
    return validity === 'Invalid' ? { booleanValue: true } : null;
  };
}
