import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { BaseComponent } from '../base/base.component';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
  
})
export class PropertyComponent extends BaseComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentProperty: Property = {} as Property;
  @ViewChild('occupancyDatePicker', { static: false }) private occupancyDatePicker: MatDatepicker<Date>;
  @ViewChild('closingDatePicker', { static: false }) private closingDatePicker: MatDatepicker<Date>;
  @ViewChild('startDatePicker', { static: false }) private startDatePicker: MatDatepicker<Date>;
  @ViewChild('endDatePicker', { static: false }) private endDatePicker: MatDatepicker<Date>;
  
  dateToday: number = Date.now();
  message = '';

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
      this.getProperty(this.route.snapshot.params['name']);
    }
  }
  
  getProperty(name: string): void {
    this.propertyService.get(name).subscribe({
      next: (data) => {
        this.currentProperty = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  save(): void {
    if(this.currentProperty.id) {
       this.updateProperty();
     } else {
       this.createProperty();
     }
  }
  updateProperty(): void {
    this.message = '';

    this.propertyService
      .update(this.currentProperty)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This property was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  createProperty(): void {
    this.message = '';
    this.propertyService
      .create(this.currentProperty)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This property was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  delete(): void {
    this.propertyService.delete(this.currentProperty.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/properties']);
      },
      error: (e) => console.error(e)
    });
  }
}
