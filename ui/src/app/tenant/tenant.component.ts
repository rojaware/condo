import { Component, Input, OnInit } from '@angular/core';
import { Tenant } from '../models/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../services/tenant.service';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.css',
})
export class TenantComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentProperty: Property = {} as Property;  
  tenant: Tenant = { } as Tenant;
  dateToday: number = Date.now();
  message: string;

  constructor(
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.message = '';
  }

  ngOnInit(): void {
    this.message = '';    
    this.tenant = this.currentProperty['tenant'];
  }

  get(propertyName: string): void {
    this.tenantService.getByProperty(propertyName).subscribe({
      next: (data) => {
        this.currentProperty.tenant = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  update(): void {
    this.message = '';

    this.tenantService.update(this.currentProperty.tenant).subscribe({
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
    this.tenantService.delete(this.currentProperty.name).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/properties']);
      },
      error: (e) => console.error(e),
    });
  }
}
