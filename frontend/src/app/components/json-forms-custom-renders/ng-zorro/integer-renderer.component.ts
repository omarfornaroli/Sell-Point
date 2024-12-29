
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JsonFormsControl } from '@jsonforms/angular';
import { RankedTester, rankWith, isIntegerControl } from '@jsonforms/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-integer-renderer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div [formGroup]="formGroup" class="form-container">
      <label *ngIf="label" [for]="id">{{ label }}</label>
      <input
        nbInput
        type="number"
        [id]="id"
        [formControlName]="controlName"
        [placeholder]="description || ''"
        [readonly]="!enabled"
        (input)="onChange($event)"
      />
      <small *ngIf="error" class="text-danger">{{ error }}</small>
    </div>
  `,
  styles: [
    `
      .form-container {
        margin-bottom: 1rem;
      }
      .text-danger {
        color: red;
      }
    `,
  ],
})
export class IntegerRendererComponent extends JsonFormsControl {
  controlName = 'integerInput';
  formGroup = new FormGroup({
    [this.controlName]: new FormControl(''),
  }) as FormGroup<{ [x: string]: FormControl<string | null>; }>;

  override mapAdditionalProps(props: any) {
    const control = this.formGroup.get(this.controlName);
    if (control) {
      control.setValue(props.data, { emitEvent: false });
      control.valueChanges.subscribe((value) => this.handleChange(value));
    }
  }

  handleChange(value: any) {
    const numValue = value !== null ? parseInt(value, 10) : null;
    if (numValue && !isNaN(numValue)) {
      this.onChange(numValue);
    }
  }
}

export const integerRendererTester: RankedTester = rankWith(
  1,
  isIntegerControl
);
