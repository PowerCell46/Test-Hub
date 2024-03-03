import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function topicDefaultValueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value === 'Select a Topic') {
            return { 'defaultSelected': true }; 
        }
        return null;
    }
}