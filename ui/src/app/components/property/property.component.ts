import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})

export class PropertyComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentProperty: Property = {};
  
  dateToday: number = Date.now();
  message = '';

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
/**
 *  = {
    name: '',
    address: '',
    rollNo: '',
    propertyCustomerNo: '',
    owner: '',
    bank: '',
    size: 0,
    builder: '',
    closingDate: '',
    occupancyDate: '',
    startDate: '',
    endDate: '',
    rentFee: 0,
    purchasePrice: 0
  };

 */
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

  deleteProperty(): void {
    this.propertyService.delete(this.currentProperty.name).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/properties']);
      },
      error: (e) => console.error(e)
    });
  }
}
