import { Component, DefaultIterableDiffer, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { User, UserColumns } from '../../models/document.model'
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component'
import { DocumentService } from '../../services/document.service'

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent {
  @Input() propertyName?: string;
  @Input() tenantName?: string;

  displayedColumns: string[] = UserColumns.map((col) => col.key)
  columnsSchema: any = UserColumns
  dataSource = new MatTableDataSource<User>()
  valid: any = {}

  constructor(public dialog: MatDialog, private DocumentService: DocumentService) {}

  ngOnInit() {
    this.DocumentService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  editRow(row: User) {
    if (row.id === 0) {
      this.DocumentService.addUser(row).subscribe((newUser: User) => {
        row.id = newUser.id
        row.isEdit = false
      })
    } else {
      this.DocumentService.updateUser(row).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: User = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.DocumentService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: User) => u.id !== id,
      )
    })
  }

  removeSelectedRows() {
    const users = this.dataSource.data.filter((u: User) => u.isSelected)
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.DocumentService.deleteUsers(users).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: User) => !u.isSelected,
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