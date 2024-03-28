import {
  Component,
  DefaultIterableDiffer,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Document } from '../../models/document.model';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { DocumentService } from '../../services/document.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../base/base.component';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent extends BaseComponent {
  @Input() propertyName?: string = '';
  @Input() tenantName?: string = '';

  displayedColumns: string[] = ['select', 'id', 'name'];

  dataSource = new MatTableDataSource<Document>();
  selection = new SelectionModel<Document>(true, []);
  documents: Document[] = [];
  valid: any = {};
  currentFile?: File;

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private documentService: DocumentService,
    private uploadService: FileUploadService ) {
    super(router);
    this.message = '';
  }

  ngOnInit() {
    const name = this.propertyName? this.propertyName: this.tenantName;
    this.reload(name);
  }

  reload(name?: string): void {
    if (name) {
      this.documentService
        .getByPropertyOrTenant(name)
        .subscribe((data: Document[]) => {
          this.dataSource = new MatTableDataSource<Document>(data);
          console.log(data);
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let propertyName = changes['propertyName'];
    if (propertyName && propertyName.previousValue && propertyName.currentValue !== propertyName.previousValue) {
      this.reload(propertyName.currentValue);
      console.log('===>' +changes['propertyName'].currentValue);
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Document): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }

  editRow(row: Document) {
    if (row.id === 0) {
      this.documentService.update(row).subscribe((newDocument: Document) => {
        row.id = newDocument.id;
        row.isEdit = false;
      });
    } else {
      this.documentService.update(row).subscribe(() => (row.isEdit = false));
    }
  }

  removeData() {
    if (this.selection.selected.length > 0) {
      const idArray = this.getIdList(this.selection.selected);
      this.documentService.deleteByIdList(idArray).subscribe({
        next: (res) => {
          console.log(res);
          const name = this.propertyName? this.propertyName: this.tenantName;
          this.reload(name);
          this.message = 'The selected files were removed successfully!';
        },
        error: (e) => {
          this.message = e.message;
          this.errMessage = 'Could not remove the selected files'
          console.error(e);
        },
      });
    } else {
      this.errMessage = "Please select a file to be removed";
    }
  }

  private getIdList(documents: Document[]): string {
    let idList: number[] = [];
    documents.forEach((item) => {
      if (item.id) {
        idList.push(item.id);
      }
    });

    return idList.toString();
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }

  /** File Upload Service... */
  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
  }

  upload(): void {
    if (this.currentFile) {
      const page = this.propertyName? "property": "tenant";
      const payload = {
        file: this.currentFile,
        page: page,
        parentName: (page === 'property')? this.propertyName: this.tenantName
      }

      this.documentService.upload(payload).subscribe({
        next: (res) => {
          console.log(res);
          this.ngOnInit();
          this.message = 'This property was updated successfully!';
        },
        error: (e) => {
          this.message = e.message;
          console.error(e);
        },
      });
    }
  }

}
