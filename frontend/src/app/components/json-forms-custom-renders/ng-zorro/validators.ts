import { Validators } from "@angular/forms";

export class FormValidators {

    static createValidators(schema: any, uischema: any) {
        const validators = [];
        if (uischema?.options?.['required']) {
            validators.push(Validators.required); // Campo obligatorio
        }
        if (schema?.maxLength) {
            validators.push(Validators.maxLength(schema.maxLength)); // Longitud máxima
        }
        if (schema?.minLength) {
            validators.push(Validators.minLength(schema.minLength)); // Longitud mínima
        }
        return validators;
    }
}   