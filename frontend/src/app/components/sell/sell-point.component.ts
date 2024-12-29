import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../services/auth.services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserEnt } from '@shared/contracts/user-ent-contracts';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-sell-point',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NzSelectModule,
    NzDividerModule,
    NzTableModule,
    NzLayoutModule
  ],
  templateUrl: './sell-point.component.html',
  styleUrl: './sell-point.component.scss'
})
export class SellPointComponent {
  sellpointForm!: FormGroup;
  returnUrl!: string;
  hide = true;
  userEnt!: UserEnt;
  data: any
  schema: any
  uischema: any
  lucy: any
  products = [
    {
      key: '1',
      name: 'John Brown',
      quantity: 5,
      price: 1342.23,
      total: 8000
    }
  ];
  constructor(
    private fb: FormBuilder,
    private authService: AuthGuard,
    private router: Router,
  ) {
  }

  onProductSelect(product: any) {
    this.products.push(product)
  }
}