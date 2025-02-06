import { Component, Input, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { JsonSchema } from '@jsonforms/core';
import { RendererService } from '../json-forms-custom-renders/ng-zorro/renderers.service';
import { DalService } from '../../dal/db.service';
import { SchemaConstants } from '@shared/constants';
import { ngZorroJsonFormsRenderersModule } from '../json-forms-custom-renders/ng-zorro/renderers.module';

@Component({
  selector: 'app-ui-form-popup',
  standalone: true,
  imports: [
    NzLayoutModule,
    ngZorroJsonFormsRenderersModule
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
  schema: JsonSchema;
  uischema: any;
  renderers: any;

  @Input('schemaID') schemaID: string;
  @Input('uiFormSchemaID') uiFormSchemaID: string;
  @Input('data') data: any;

  constructor(
    private rendererService: RendererService,
    private dal: DalService,
  ) {
  }

  ngOnInit() {
    this.init();
  }

  private async init() {
    if (!this.schemaID || !this.uiFormSchemaID) throw new Error('Schema ID or UI Form Schema ID not provided');
    this.renderers = this.rendererService.getRenderers()

    this.schema = await this.dal.findById(SchemaConstants.Schema, this.schemaID) as JsonSchema;
    this.uischema = await this.dal.findById(SchemaConstants.UIFormSchemaID, this.uiFormSchemaID);
  }
}
