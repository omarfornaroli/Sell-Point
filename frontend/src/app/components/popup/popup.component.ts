import { Component, Inject, OnInit } from '@angular/core';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { JsonSchema } from '@jsonforms/core';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-custom-popup',
  standalone: true,
  imports: [ViewComponent],
  template: `
    <div>
      <app-ui-form-popup [schemaID]="schemaID" [uiFormSchemaID]="uiFormSchemaID" [data]="data"></app-ui-form-popup>
    </div>
  `,
})
export class CustomPopupComponent implements OnInit {
  schema: JsonSchema;
  schemaID: string;
  uiFormSchemaID: string;

  constructor(
    private modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: any
  ) { }

  ngOnInit() {
    this.schemaID = this.data.schemaID;
    this.uiFormSchemaID = this.data.uiFormSchemaID;
  }

  close(): void {
    this.modalRef.close();
  }
}
