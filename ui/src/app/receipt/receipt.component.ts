import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '@app/base/base.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/confirm-dialog/confirm-dialog.component';
import { ReceiptColumns, Receipt, ReceiptTypeEnum } from '@app/models/receipt.model';
import { ReceiptService } from '@app/services/receipt.service';
import { CurrencyPipe } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent extends BaseComponent implements OnInit {
  @Input() currentPropertyName: string = '';
  @ViewChild(MatAccordion) accordion: MatAccordion;  
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
  currentYear: number = this.today.getFullYear();
  searchYear: number;
  searchTenant: string;
  searchDescription: string;
  searchCategory: string;
  
  constructor(
    protected router: Router,
    private receiptService: ReceiptService,
    public dialog: MatDialog, 
    private currencyPipe : CurrencyPipe) {
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
      this.getTotalCost();
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getTotalCost(): number {
    const arr = this.dataSource.data.map(item => item.payment);
    const sum = arr.reduce((accumulator: number, currentValue: number) => {
      let y: number = +currentValue;
      return accumulator + y;
    }, 0);
    this.total = sum;
    return sum;
  }

  saveRow(row: Receipt) {
    if (row.id === 0) {
      this.receiptService.create(row).subscribe((newReceipt: Receipt) => {
        row.id = newReceipt.id;
        row.isEdit = false;
        this.message = "Inserted Successfully";
        this.getTotalCost();
      })
    } else {
      this.receiptService.update(row).subscribe(() => {
        row.isEdit = false;
        this.message = "Updated Successfully";
        this.getTotalCost();
      })
    }
  }

  addRow() {
    const newRow: Receipt = {
      id: 0,
      propertyName: this.currentPropertyName,
      tenantName: this.config.user.property.tenant.primaryName,
      year: this.today.getFullYear(),
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
      this.getTotalCost();
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
            this.getTotalCost();
          })
        }
      })
  }

  inputHandler(e: any, id: number, col: any) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][col.key] = e.target.validity.valid
    if (col.type === 'currency' && e.target.value) {
      const formatted = this.currencyPipe.transform(e.target.value, '$');
      e.target.value = formatted;
    }
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

  /**
   * Collapse Search Area
   */
  search(): void {
    const propertyName = this.currentPropertyName.trim();
    const payload = {
      propertyName: propertyName,
      tenantName: this.searchTenant, 
      description: this.searchDescription,
      year: this.searchYear, 
      category: this.searchCategory
    }
    this.receiptService.search(payload).subscribe((res: any) => {
      // add extra logic to populate fields after result... here...
      this.dataSource.data = res;      
      this.message = "Searched..."
      this.getTotalCost();
    })    
  }
}