import { Component, DefaultIterableDiffer, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { Document } from '../../models/document.model'
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component'
import { DocumentService } from '../../services/document.service'
import { SelectionModel } from '@angular/cdk/collections'

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent {
  @Input() propertyName?: string;
  @Input() tenantName?: string;

  displayedColumns: string[] = ['select', 'name', 'data'];
  
  dataSource = new MatTableDataSource<Document>();
  selection = new SelectionModel<Document>(true, []);
  documents: Document[] = [];
  valid: any = {};

  constructor(public dialog: MatDialog, private DocumentService: DocumentService) {}

  ngOnInit() {
    const name = this.propertyName || this.tenantName;
    if (name) {
      this.DocumentService.getByPropertyOrTenant(name).subscribe((data: Document[]) => {
        
        this.dataSource = new MatTableDataSource<Document>(data);
        console.log(data);   
      })
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
      this.DocumentService.create(row).subscribe((newDocument: Document) => {
        row.id = newDocument.id
        row.isEdit = false
      })
    } else {
      this.DocumentService.update(row).subscribe(() => (row.isEdit = false))
    }
  }

  addData() {
    const randomElementIndex = Math.floor(Math.random() * this.documents.length);
    const parentName = this.propertyName? this.propertyName: this.tenantName;
    let newDocument: Document = {      
      id : 0,
      parentName : parentName,
      name : '',
      data : undefined,
      isEdit : false  
    };
    this.documents.push(newDocument);
    this.dataSource = new MatTableDataSource<Document>(this.documents);    
    
  }

  removeData() {
    // TBA
  }


  private getIdList(documents: Document[]): string {
    let idList: number[] = [];    
    documents.forEach(item => {
      if (item.id) {
        idList.push(item.id )
      }
    });

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

}