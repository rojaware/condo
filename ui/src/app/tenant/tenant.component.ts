import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../models/property.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.css'
})
export class TenantComponent implements OnInit{
  @Input() viewMode = false;

  @Input() currentProperty: Property = {};
  
  dateToday: number = Date.now();
  message = '';

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode ) {
      this.message = '';
      // this.getProperty(this.route.snapshot.params['name']);
    }
  }
}
