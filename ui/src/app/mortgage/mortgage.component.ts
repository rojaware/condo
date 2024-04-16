import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@app/base/base.component';
import { Mortgage } from '@app/models/mortgage.model';
import { Property } from '@app/models/property.model';

@Component({
  selector: 'app-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrl: './mortgage.component.css'
})
export class MortgageComponent extends BaseComponent implements OnInit {
  @Input() currentProperty: Property;
  
  constructor(
    protected router: Router,
  ) {
    super(router);
  }
  
  ngOnInit(): void {
  }

  save(): void {

  }
  delete(): void {

  }
}
