import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BaseComponent } from '../base/base.component';
import { Property } from '../models/property.model';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel-holder.component.html',
  styleUrl: './carousel-holder.component.css',
})
export class CarouselHolderComponent extends BaseComponent implements OnInit {
  @Input() properties?: Property[] ;
  @Output() selectedProperty = new EventEmitter<Property>();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
    nav: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  
  constructor(protected router: Router,    
    private propertyService: PropertyService,) {
    super(router);
  }

  ngOnInit(): void {     
  }

  onPropertySelected(slide: Property, index: number): void {
    console.log(slide)
    // find the active property from config
    // update
    let currentProperty = this.properties?.find(item => item.name === slide.name)

    if (currentProperty) {
      currentProperty.index = index;
      this.selectedProperty.emit(currentProperty);
    }    
  }
}
