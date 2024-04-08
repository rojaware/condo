import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { Label, LabelColumns, LabelTypeEnum } from '../models/label.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SettingService } from '@app/services/setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = LabelColumns.map((col) => col.key)
  columnsSchema: any = LabelColumns
  dataSource = new MatTableDataSource<Label>()
  valid: any = {}  
  labelTypes = Object.values(LabelTypeEnum);
  dueDays: number = 70;
  
  constructor(
    protected router: Router,
    private settingService: SettingService,
    public dialog: MatDialog, ) {
    super(router);
    this.message = '';
    this.errMessage = '';
  }

  ngOnInit() {
    this.settingService.getAll().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  editRow(row: Label) {
    if (row.id === 0) {
      this.settingService.create(row).subscribe((newLabel: Label) => {
        row.id = newLabel.id
        row.isEdit = false
      })
    } else {
      this.settingService.update(row).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: Label = {
      id: 0,
      name: '',
      value: '',
      viewValue: '',
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.settingService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (label: Label) => label.id !== id,
      )
    })
  }

  removeSelectedRows() {
    const labels = this.dataSource.data.filter((label: Label) => label.isSelected)
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.settingService.deleteByIdList(labels).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (label: Label) => !label.isSelected,
            )
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