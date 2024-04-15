import { Component, Input, OnInit } from '@angular/core';
import { Tenant } from '../models/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../services/tenant.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.css',
})
export class TenantComponent extends BaseComponent implements OnInit {
  @Input() viewMode = true;  
  @Input() tenant: Tenant = {} as Tenant;
  
  dateToday: number = Date.now();
  message: string;

  constructor(
    protected router: Router,
    private tenantService: TenantService,
    private route: ActivatedRoute,    
  ) {
    super(router);
    this.message = '';
  }

  ngOnInit(): void {
    this.message = '';   
    // if no tenant, then open new tenant form
    if (!this.tenant) {
      this.createTenant();
    }

  }
  
  createTenant(): void {
    let newTenant = new Tenant();
    newTenant = {      
      primaryName: 'fill',
      secondaryName: '',
      phone: '',
      secondaryPhone: '',
      email: '',
      secondaryEmail: '',
      comment: '',
      propertyName: this.config.user.property.name,
      documents: []
    };
    this.tenant = newTenant;    
  }
  
  get(propertyName: string): void {
    this.tenantService.getByProperty(propertyName).subscribe({
      next: (data) => {
        this.tenant = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  save(): void {
    if (this.tenant.id) {
      this.update();
    } else {
      this.insert();
    }
    this.viewMode = true;
  }
  insert(): void {
    this.message = '';
    this.tenant.propertyName = this.config.user.property.name;
    this.tenantService.create(this.tenant).subscribe({
      next: (res) => {
        console.log(res);
        this.tenant.id = res.id;
        this.message = res.message
          ? res.message
          : 'This tenant has been inserted successfully!';
      },
      error: (e) => {
        console.error(e)
        this.errMessage = 'Failed ...' + e.message;
      }
    });
  }

  update(): void {
    this.message = '';
    this.tenant.propertyName = this.config.user.property.name;
    this.tenantService.update(this.tenant).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This tenant has been updated successfully!';
      },
      error: (e) => {
        console.error(e)
        this.errMessage = 'Failed ...' + e.message;
      }
    });
  }

  delete(): void {
    this.tenantService.delete(this.tenant.propertyName).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/properties']);
      },
      error: (e) => console.error(e),
    });
  }

}
