import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from '@app/base/base.component';
import { LeaseDate, LeaseDateColumns, MaturityDateColumns } from '@app/models/lease-date.model';
import { PropertyService } from '@app/services/property.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent extends BaseComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = LeaseDateColumns.map((col) => col.key);
  maturityDisplayedColumns: string[] = MaturityDateColumns.map((col) => col.key)
  columnsSchema: any = LeaseDateColumns;
  maturityColumnsSchema: any = MaturityDateColumns;
  dataSource = new MatTableDataSource<LeaseDate>();
  maturityDataSource = new MatTableDataSource<LeaseDate>();
  
  constructor(
    protected router: Router,
    private propertyService: PropertyService ) {
    super(router);
  }
  
  ngOnInit() {
    this.propertyService.getLeaseDates().subscribe((res: any) => {
      this.dataSource.data = res
    })
    this.propertyService.getMaturityDates().subscribe((res: any) => {
      this.maturityDataSource.data = res
    })
  }
}

