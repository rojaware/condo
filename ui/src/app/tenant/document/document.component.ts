import { Component, DefaultIterableDiffer, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { Document, DocumentColumns } from '../../models/document.model'
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

  displayedColumns: string[] = DocumentColumns.map((col) => col.key)
  columnsSchema: any = DocumentColumns;
  dataSource = new MatTableDataSource<Document>();
  valid: any = {};

  constructor(public dialog: MatDialog, private DocumentService: DocumentService) {}

  ngOnInit() {
    const name = this.propertyName || this.tenantName;
    if (name) {
      this.DocumentService.getByPropertyOrTenant(name).subscribe((res: any) => {
        this.dataSource.data = res
      })
    }
  }

  editRow(row: Document) {
    if (row.id === 0) {
      this.DocumentService.create(row).subscribe((newDocument: Document) => {
        row.id = newDocument.id
        row.isEdit = false
      })
    } else {
      this.DocumentService.update(row).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: Document = {
      id: 0,
      parentName: '',
      name: '',
      data: {} as any,
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.DocumentService.deleteById(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Document) => u.id !== id,
      )
    })
  }

  removeSelectedRows() {
    const documents = this.dataSource.data.filter((doc: Document) => doc.isSelected)
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          const idList = this.getIdList(documents);
          this.DocumentService.deleteByIdList(idList).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: Document) => !u.isSelected,
            )
          })
        }
      })
  }
  private getIdList(documents: Document[]): string {
    let idList: number[] = [];
    documents.forEach(item => idList.push(item.id));

    throw idList.toString();
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