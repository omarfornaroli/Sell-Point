/*
  The MIT License
  
  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isStringControl, RankedTester, rankWith } from '@jsonforms/core';
import { FormValidators } from './validators';

@Component({
    selector: 'app-string-renderer',
    template: `
    <div class="form-container">
        <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
        <input
            nz-input
            [type]="getType()"
            [id]="id"
            [formControl]="formControl"
            [nzStatus]="error?'error':''"
            
        />
        <small *ngIf="error" class="text-danger">{{ error }}</small>
    </div>`,
    styles: [
        `
      :host {
        .form-container {
        display: flex;
        flex-direction: column;
        }
    }
    `,
    ],
})
export class StringRendererComponent extends JsonFormsControl {
    focused = true;
    placeholder: string = '';
    formControl!: FormControl;

    override ngOnInit() {
        super.ngOnInit();
        this.placeholder = this.uischema?.options?.['placeholder'] || '';
        this.formControl = new FormControl(this.data, FormValidators.createValidators(this.schema, this.uischema));
        this.formControl.valueChanges.subscribe((value) => this.onChange(value)); // Notificar cambios
    }

    constructor(jsonformsService: JsonFormsAngularService) {
        super(jsonformsService);
    }
    override getEventValue = (event: any) => event || undefined;
    getType = (): string => {
        if (this.uischema.options && this.uischema.options['format']) {
            return this.uischema.options['format'];
        }
        if (this.scopedSchema && this.scopedSchema.format) {
            switch (this.scopedSchema.format) {
                case 'email':
                    return 'email';
                case 'tel':
                    return 'tel';
                default:
                    return 'text';
            }
        }
        return 'text';
    };

}

export const StringRendererTester: RankedTester = rankWith(
    2,
    isStringControl
);