import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Property } from '../models/property.model';
import { PropertyService } from '../services/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../services/tenant.service';
import { Tenant } from '../models/tenant.model';
import { BaseComponent } from '../base/base.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent extends BaseComponent implements OnInit, AfterViewInit  {
  properties?: Property[];
  currentProperty: Property;
  currentTenant: Tenant;

  currentIndex? = -1;
  name = '';
  search: String = '';

  constructor(
    protected router: Router,
    private propertyService: PropertyService,
    private tenantService: TenantService,
    private route: ActivatedRoute,    
  ) {
    super(router);
  }
  ngOnInit(): void {
    this.retrievePropertyList();
  }

  ngAfterViewInit() {
    console.log('current config is ' + JSON.stringify(this.config) );
  }

  retrievePropertyList(): void {
    this.propertyService.getAll().subscribe({
      next: (data) => {        
        // retrieve all tenants by property
        if (data) {
          data.forEach (async prop => {
            await this.appendTenantToProperty(prop);
          });
          this.properties = data;
        } else {
          this.properties = data;
        }
        
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  private appendTenantToProperty(property: Property): void {
    this.tenantService.getByProperty(property.name).subscribe({
      next: (data: Tenant) => {
        property.tenant = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrievePropertyList();
    this.currentProperty = {} as Property;
    this.currentIndex = -1;
  }

  setActiveProperty(property: Property, index?: number): void {
    this.currentProperty = property;
    this.currentTenant = property.tenant;
    if (!this.config.user) {
      this.config.user = {} as User;
    }
    this.config.user.property = property;
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
