import { Injectable } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ComponentType } from '@angular/cdk/portal';
import { CustomPopupComponent } from '../components/popup/popup.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private modal: NzModalService) { }

  open<T, D = any, R = any>(
    data?: D
  ): NzModalRef<T, R> {
    return this.modal.create({
      nzContent: CustomPopupComponent as ComponentType<T>,
      nzData: data, // Se usa en lugar de nzComponentParams
      nzFooter: null, // Elimina botones predeterminados
      nzWidth: 500,
    });
  }
}
