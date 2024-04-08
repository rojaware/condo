import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '@app/services/property.service';
import { Property } from '@app/models/property.model';
import { BaseComponent } from '@app/base/base.component';
import { MatDatepicker } from '@angular/material/datepicker';
import { Label } from '@app/models/label.model';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
  
})
export class PropertyComponent extends BaseComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentProperty: Property = {} as Property;  
  @Output() isPropertyDeleted = new EventEmitter<boolean>();
  @ViewChild('occupancyDatePicker', { static: false }) private occupancyDatePicker: MatDatepicker<Date>;
  @ViewChild('closingDatePicker', { static: false }) private closingDatePicker: MatDatepicker<Date>;
  @ViewChild('startDatePicker', { static: false }) private startDatePicker: MatDatepicker<Date>;
  @ViewChild('endDatePicker', { static: false }) private endDatePicker: MatDatepicker<Date>;
  @ViewChild('maturityDatePicker', { static: false }) private maturityDatePicker: MatDatepicker<Date>;
  @ViewChild('purchaseDatePicker', { static: false }) private purchaseDatePicker: MatDatepicker<Date>;
  @ViewChild('extendedEndDatePicker', { static: false }) private extendedEndDatePicker: MatDatepicker<Date>;
  @ViewChild('salesDatePicker', { static: false }) private salesDatePicker: MatDatepicker<Date>;
  
  
  dateToday: number = Date.now();  
  banks: Label[] ;
  owners: Label[];

  constructor(
    protected router: Router,
    private propertyService: PropertyService,
    private route: ActivatedRoute,  
  ) {
    super(router);
  }

  ngOnInit(): void {
    if (!this.viewMode ) {
      this.message = '';      
      this.errMessage = '';
      this.getProperty(this.route.snapshot.params['name']);
    }
  }
  
  getProperty(name: string): void {
    this.message = '';
    this.errMessage = '';    
    this.propertyService.get(name).subscribe({
      next: (data) => {
        this.currentProperty = data;
        console.log(data);
      },
      error: (e) => {
        console.error(e);
        this.errMessage = 'Failed retrieving...' + e.message;
      }
    });
  }

  save(): void {
    this.message = '';
    this.errMessage = '';    
    if(this.currentProperty.id) {
       this.updateProperty();
     } else {
       this.createProperty();
     }
  }
  updateProperty(): void {
    this.propertyService
      .update(this.currentProperty)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This property has been updated successfully!';
          this.viewMode = true;  
        },
        error: (e) => {
          console.error(e);
          this.errMessage = 'Failed saving...' + e.message;
        }
      });
  }

  createProperty(): void {
    this.propertyService
      .create(this.currentProperty)
      .subscribe({
        next: (res) => {
          console.log(res);          
          this.currentProperty.id = res.id;
          this.message = res.message
            ? res.message
            : 'This property was updated successfully!';
          this.viewMode = true;  
        },
        error: (e) => {
          console.error(e);
          this.errMessage = 'Failed saving...' + e.message;
        }
      });
  }

  delete(): void {
    this.message = '';    
    this.errMessage = '';    
    this.propertyService.delete(this.currentProperty.id).subscribe({
      next: (res) => {
        console.log(res);
        this.message = 'Deleted property (' + this.currentProperty.name + ') successfully'
        this.currentProperty = {} as Property;        
        this.isPropertyDeleted.emit(true);
        this.viewMode = true;
        this.router.navigateByUrl('properties');
      },
      error: (e) => {
        console.error(e);
        this.errMessage = 'Failed saving...' + e.message;
      }
    });
  }

  onNgModelChange(event: any): void { }

  /**
   * 1. set fiscal year date to end date, overwrite
   * 2. make the extended end date empty
   */
  onStartDateClose() {    
    const endDate = this.util.calculateNextFiscalYearEndDate(this.currentProperty.startDate);
    this.currentProperty.endDate = endDate;
    this.currentProperty.extendedEndDate = '';    
  }

  /**
   * If the extended date is empty 
   * AND end date is not same as extended date
   * @param event 
   */
  onExtendedDateFocused(event: any) {
    if (this.util.isEmpty(this.currentProperty.extendedEndDate)) {
       if (!this.util.isEmpty(this.currentProperty.endDate)) {
          const extendedEndDate = this.util.calculateNextFiscalYearEndDate(this.currentProperty.endDate);
          this.currentProperty.extendedEndDate = extendedEndDate;
       }
    } else { // extendedEndDate exists...
      if (!this.util.isEmpty(this.currentProperty.endDate)
          && this.util.getDaysDifference(this.currentProperty.startDate, this.currentProperty.endDate) < 1 ) {
          this.currentProperty.extendedEndDate = '';
      }
    }      
  }

}
