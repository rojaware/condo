import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/base/base.component';
import { Router } from '@angular/router';
import { Label, LabelColumns, LabelTypeEnum } from '@app/models/label.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/confirm-dialog/confirm-dialog.component';
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
  batchHour: number;
  batchMinute: number;
  time: any;
  
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
      const batchLabels = res.filter((item: Label) => item.name === LabelTypeEnum.Batch);
      if (batchLabels) {
        const hour = batchLabels.find((item: Label) => item.viewValue === 'Hour')
        this.batchHour = hour.value;
        const minute = batchLabels.find((item: Label) => item.viewValue === 'Minute')
        this.batchMinute = minute.value;
        this.time;
        this.time = hour.value + ':' + minute.value;
      }
      this.dataSource.data = res;      
    })
  }
  onTimeSet(time: string) {
    this.time = time;
    const array = time.split(':');
    let hourRow = this.dataSource.data.find((item: Label) => item.viewValue === 'Hour')
    if (hourRow) {
      hourRow.value = array[0];
      this.saveRow(hourRow);
    }
    let minuteRow = this.dataSource.data.find((item: Label) => item.viewValue === 'Minute')
    if (minuteRow) {
      minuteRow.value = array[1];
      this.saveRow(minuteRow);
    }
  }
  onDueDaysChanged() {
    let daysRow = this.dataSource.data.find((item: Label) => item.viewValue === 'Days')
    if (daysRow) {
      daysRow.value = this.dueDays + '';
      this.saveRow(daysRow);
    }
  }
  saveRow(row: Label) {
    if (row.id === 0) {
      this.settingService.create(row).subscribe((newLabel: Label) => {
        row.id = newLabel.id;
        row.isEdit = false;
        this.message = "Inserted Successfully";
      })
    } else {
      this.settingService.update(row).subscribe(() => {
        row.isEdit = false;
        this.message = "Updated Successfully";
      })
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