import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../services/auth.services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserEnt } from '@shared/contracts/user-ent-contracts';
import { Product } from '@shared/contracts/product-contracts';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { DalService } from '../../dal/db.service';
import { IdConstants, SchemaConstants } from '@shared/constants';
import { SchemaHelper } from '@shared/helpers';
import { PopupService } from '../../services/popup-service';
@Component({
  selector: 'app-sell-point',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzSelectModule,
    NzDividerModule,
    NzTableModule,
    NzLayoutModule
  ],
  providers: [PopupService],
  templateUrl: './sell-point.component.html',
  styleUrl: './sell-point.component.scss'
})
export class SellPointComponent implements AfterViewInit {
  sellpointForm!: FormGroup;
  returnUrl!: string;
  hide = true;
  userEnt!: UserEnt;
  data: any
  schema: any
  uischema: any
  lucy: any
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productsToSell: Product[] = [];
  selectedProduct: Product;

  constructor(
    private dalService: DalService,
    private popupService: PopupService
  ) {
  }
  ngAfterViewInit() {
    this.loadProducts();
  }

  async loadProducts() {
    const schemaAlias = SchemaHelper.getSchemaAlias_FromId(SchemaConstants.Product);
    this.products = await this.dalService.findBySchema(schemaAlias) as Product[];
  }

  onProductSelect(_id: string) {
    // setTimeout(() => this.selectedProduct = null, 0);
    // const existingProductToSell = this.productsToSell.find(p => p._id === _id)
    // if (existingProductToSell) {
    //   existingProductToSell.quantity++;
    //   return;
    // }
    // this.productsToSell = [...this.productsToSell, { ...this.getProduct(_id), quantity: 1 }];

    this.popupService.open({ schemaID: SchemaConstants.User, uiFormSchemaID: IdConstants.selectedProductSellSetup });

  }

  getProduct$(_id: string) { return of(this.getProduct(_id)) }
  getProduct(_id: string) { return this.products.find(p => p._id === _id) }
  getTotal(quantity: number, price: number) { return (quantity ?? 1) * price }
  onProductSearch(search: string) {
    this.filteredProducts = this.products.filter(p => p._label.toLowerCase().includes(search.toLowerCase()));
  }
}
