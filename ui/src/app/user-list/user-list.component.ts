import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '@app/base/base.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/confirm-dialog/confirm-dialog.component';
import { UserColumns, UserProfile, RoleTypeEnum, User } from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent extends BaseComponent implements OnInit {
  @Input() businessNo: string = '';
  @ViewChild(MatAccordion) accordion: MatAccordion;  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = UserColumns.map((col) => col.key)
  columnsSchema: any = UserColumns
  dataSource = new MatTableDataSource<UserProfile>()
  valid: any = {}  
  roleTypes = Object.values(RoleTypeEnum);
  
  time: any;
  total: number = 0;
  currentYear: number = this.today.getFullYear();  
  searchUsername: string;
  searchBusinessNo: string;
  
  constructor(
    protected router: Router,
    private userService: UserService,
    public dialog: MatDialog, ) {
    super(router);
    this.message = '';
    this.errMessage = '';
  }

  ngOnInit() {
    if (!this.config.user) {
      this.config.user = {} as User;
    }
    if (!this.config.user.profile) {
      this.config.user.profile = new UserProfile();
    }
    this.reload();
  }

  reload() {
    this.userService.getByBusinessNo(this.config.user.profile.businessNo).subscribe((res: any) => {
      // add extra logic to populate fields after result... here...
      this.dataSource.data = res;      
      this.total = this.dataSource.data.length;
      this.message = "Refreshed...";      
    })
  }

  loadAllUsers() {
    this.userService.getAll().subscribe((res: any) => {
      // add extra logic to populate fields after result... here...
      this.dataSource.data = res;      
      this.total = this.dataSource.data.length;
      this.message = "Refreshed...";      
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }  

  saveRow(row: UserProfile) {
    if (!row.createdOn) {
      this.userService.create(row).subscribe((profile: UserProfile) => {
        row.username = profile.username;
        row.isEdit = false;
        this.message = "Inserted Successfully";      
      })
    } else {
      this.userService.update(row).subscribe(() => {
        row.isEdit = false;
        this.message = "Updated Successfully";
      })
    }
  }

  addRow() {
    const newRow: UserProfile = {
      username: '',
      password: '',
      role: '',
      businessNo: '',
      createdOn: '',
      updatedOn: '',
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data];    
  }

  removeRow(username: string) {
    this.userService.delete(username).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (profile: UserProfile) => profile.username !== username,
      );
      this.total= this.dataSource.data.length;
    })
  }

  removeSelectedRows() {
    const profiles = this.dataSource.data.filter((profile: UserProfile) => profile.isSelected)
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteByUsernameList(profiles).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (profile: UserProfile) => !profile.isSelected,
            );
            this.total= this.dataSource.data.length;
          })
        }
      })
  }

  inputHandler(e: any, username: string, col: any) {
    if (!this.valid[username]) {
      this.valid[username] = {}
    }
    this.valid[username][col.key] = e.target.validity.valid;    
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
    const businessNo = this.config.user.profile.businessNo;
    const payload = {
      businessNo: this.searchBusinessNo || businessNo,
      username: this.searchUsername, 
    }
    this.userService.search(payload).subscribe((res: any) => {
      // add extra logic to populate fields after result... here...
      this.dataSource.data = res;    
      this.total = this.dataSource.data.length;  
      this.message = "Searched..."
    })    
  }
}
