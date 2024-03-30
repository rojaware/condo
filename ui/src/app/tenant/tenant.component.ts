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
      
      primaryName: '',
      secondaryName: '',
      phone: '',
      email: '',
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
  }
  insert(): void {
    this.message = '';

    this.tenantService.create(this.tenant).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This tenant was inserted successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  update(): void {
    this.message = '';

    this.tenantService.update(this.tenant).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This tenant was updated successfully!';
      },
      error: (e) => console.error(e),
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
