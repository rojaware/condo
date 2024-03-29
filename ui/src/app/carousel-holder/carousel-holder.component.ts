import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BaseComponent } from '../base/base.component';
import { Property } from '../models/property.model';
import { PropertyService } from '../services/property.service';

const SLIDE_LIST = [
  {
    id: 1,
    src: 'https://th.bing.com/th/id/R.4219c400190b24a52a169a17355565b7?rik=zv0qCGX87d9oYQ&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f50eb66f0e4b0033596299a41%2ft%2f5f72a5196df42c5960e00e65%2f1601348905122%2fIMG_1207.jpg%3fformat%3d1500w&ehk=DMdNKl82Cb2IzrDmeCw6KlT9iGD9MLlNYXwfX5VM9E8%3d&risl=&pid=ImgRaw&r=0',
    alt: '68 Abell St',
    title: 'Abell Epic',
  },
  {
    id: 2,
    src: 'https://shared-s3.property.ca/public/images/listings/optimized/c4382421/mls/c4382421_1.jpg?v=1',
    alt: '210 Simcoe St',
    title: 'Simcoe',
  },
  {
    id: 3,
    src: 'https://photos.zolo.ca/103b-158-front-street-east-toronto-C5883297-3.jpg?2023-01-30+08:17:28',
    alt: '158 Front St E | St. Lawrence Condominiums',
    title: '608-158 Front St',
  },
  {
    id: 4,
    src: 'https://buttonwood.b-cdn.net/media/024_1702-158-Front-St-E_Small-File.jpg',
    alt: '158 Front St E | St. Lawrence Condominiums',
    title: '804-158 Front St',
  },
  {
    id: 5,
    src: 'https://dlki4wuaopcoc.cloudfront.net/property/medias/1616525827_84120400_Entrance.jpg',
    alt: '4506-2221 Yonge St',
    title: 'Yonge',
  },
  {
    id: 6,
    src: 'https://shared-s3.property.ca/public/images/listings/optimized/c7311646/mls/c7311646_1-640x480.jpg?v=2',
    alt: '395 Bloor St E',
    title: 'Bloor',
  },
  {
    id: 7,
    src: 'https://photos.zolo.ca/1204-77-mutual-street-toronto-C5231763-3.jpg?2021-07-07+03:57:29',
    alt: '77 Mutual St',
    title: 'Mutual',
  },
  {
    id: 8,
    src: 'https://shared-s3.property.ca/public/images/listings/optimized/w7376034/mls/w7376034_2-640x480.jpg?v=2',
    alt: '270 Dufferin St Toronto, ON M6K 0H8',
    title: 'Dufferin XO',
  },
];
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel-holder.component.html',
  styleUrl: './carousel-holder.component.css',
})
export class CarouselHolderComponent extends BaseComponent implements OnInit {
  @Input() properties?: Property[] ;
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

  slides = SLIDE_LIST;
  constructor(protected router: Router,    
    private propertyService: PropertyService,) {
    super(router);
  }

  ngOnInit(): void {
    // this.slides = SLIDE_LIST;
    
  }
  
}

// export interface Slide {
//   id: string,
//   src: string,
//   alt: string,
//   title: string
// }
