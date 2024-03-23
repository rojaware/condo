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
    
    // if (this.config?.user?.property) {
    //   this.tenant = this.config.user.property.tenant;
    // }
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
