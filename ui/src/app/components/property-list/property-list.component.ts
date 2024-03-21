import { Component, OnInit } from '@angular/core';
import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties?: Property[];
  currentProperty: Property = {};
  currentIndex? = -1;
  name = '';
  search: String = '';

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.retrievePropertyList();
  }

  ngAfterContentChecked(): void {
    console.log(' ==>' + this.currentIndex);
  }
  retrievePropertyList(): void {
    this.propertyService.getAll().subscribe({
      next: (data) => {
        this.properties = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrievePropertyList();
    this.currentProperty = {};
    this.currentIndex = -1;
  }

  setActiveProperty(property: Property, index?: number): void {
    this.currentProperty = property;
    this.currentIndex = index;
  }

  removeAllProperty(): void {
    this.propertyService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

  addProperty(): void {
    let newProperty = {
      name: 'new',
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
      purchasePrice: 0,
    };
    this.properties?.push(newProperty);
    const index = this.properties?.length;
    this.setActiveProperty(newProperty, index);
  }

  searchName(): void {
    this.currentProperty = {};
    this.currentIndex = -1;

    this.propertyService.findByName(this.name).subscribe({
      next: (data) => {
        this.properties = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
