import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null; // In case of empty value
        }
        const hasUpperChar = /[A-Z]/.test(value);
        const hasLowerChar = /[a-z]/.test(value);
        const hasDigit = /[0-9]/.test(value);

        const passwordValid = hasUpperChar && hasLowerChar && hasDigit;

        return !passwordValid ? {passwordStrength: true} : null;
    }
}