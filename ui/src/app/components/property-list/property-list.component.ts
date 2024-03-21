import { Component, OnInit } from '@angular/core';
import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../models/tenant.model';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties?: Property[];
  currentProperty: Property;
  
  currentIndex? = -1;
  name = '';
  search: String = '';

  constructor(
    private propertyService: PropertyService,
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.retrievePropertyList();
  }

  retrievePropertyList(): void {
    this.propertyService.getAll().subscribe({
      next: (data) => {
        this.properties = data;
        // retrieve all tenants by property
        this.properties?.forEach (prop => this.appendTenantToProperty(prop));
        console.log(data);
      },
      error: (e) => console.error(e),
    });

  }

  private appendTenantToProperty(property: Property): void {
    this.tenantService.getByProperty(property.name).subscribe({
      next: (data) => {
        property.tenant = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  onTabChanged(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 1: // index of the tenant
        break;
      case 2:
        // do stuff with content or do nothing :)
        break;
    }
  }

  refreshList(): void {
    this.retrievePropertyList();
    this.currentProperty = {} as Property;
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
    } as Property;
    this.properties?.push(newProperty);
    const index = this.properties?.length;
    this.setActiveProperty(newProperty, index);
  }

  searchName(): void {
    this.currentProperty = {} as Property;
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
