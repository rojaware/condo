import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@app/base/base.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/confirm-dialog/confirm-dialog.component';
import { SettingService } from '@app/services/setting.service';
import { ReceiptColumns, Receipt, ReceiptTypeEnum } from '@app/models/receipt.model';
import { ReceiptService } from '@app/services/receipt.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent extends BaseComponent implements OnInit {
  @Input() currentPropertyName: string = '';
  displayedColumns: string[] = ReceiptColumns.map((col) => col.key)
  columnsSchema: any = ReceiptColumns
  dataSource = new MatTableDataSource<Receipt>()
  valid: any = {}  
  receiptTypes = Object.values(ReceiptTypeEnum);
  tenantTypes: string[] = [];
  dueDays: number = 70;
  batchHour: number;
  batchMinute: number;
  time: any;
  total: number = 0;
  
  constructor(
    protected router: Router,
    private receiptService: ReceiptService,
    public dialog: MatDialog, ) {
    super(router);
    this.message = '';
    this.errMessage = '';
  }

  ngOnInit() {
    this.tenantTypes.push (this.config.user.property.tenant.primaryName);
    const secondaryTenant = this.config.user.property.tenant.secondaryName;
    if (secondaryTenant) {
      this.tenantTypes.push (this.config.user.property.tenant.secondaryName);
    }
    this.receiptService.getByProperty(this.currentPropertyName).subscribe((res: any) => {
      // add extra logic to populate fields after result... here...
      this.dataSource.data = res;      
      this.message = "Refreshed..."
      this.countTotal();
    })
  }
  
  countTotal(): void {
    const arr = this.dataSource.data.map(item => item.payment);
    const sum = arr.reduce((accumulator: number, currentValue: number) => {
      let y: number = +currentValue;
      return accumulator + y;
    }, 0);
    this.total = sum;
  }

  saveRow(row: Receipt) {
    if (row.id === 0) {
      this.receiptService.create(row).subscribe((newReceipt: Receipt) => {
        row.id = newReceipt.id;
        row.isEdit = false;
        this.message = "Inserted Successfully";
        this.countTotal();
      })
    } else {
      this.receiptService.update(row).subscribe(() => {
        row.isEdit = false;
        this.message = "Updated Successfully";
        this.countTotal();
      })
    }
  }

  addRow() {
    const newRow: Receipt = {
      id: 0,
      propertyName: this.currentPropertyName,
      tenantName: '',
      type: ReceiptTypeEnum.Medical,
      description: '',
      payment: 0,
      comment: '',
      updatedOn: '',
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.receiptService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (receipt: Receipt) => receipt.id !== id,
      );
      this.countTotal();
    })
  }

  removeSelectedRows() {
    const receipts = this.dataSource.data.filter((receipt: Receipt) => receipt.isSelected)
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.receiptService.deleteByIdList(receipts).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (receipt: Receipt) => !receipt.isSelected,
            );
            this.countTotal();
          })
        }
      })
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }
}