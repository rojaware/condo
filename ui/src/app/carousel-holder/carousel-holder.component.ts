import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

const SLIDE_LIST = [
  {
    id: '1',
    src: "https://condoroyalty.com/wp-content/uploads/2012/10/4ad6df0790d749b51a9680aaf0316ad3.jpg",
    alt: '68 Abell St',
    title: 'Abell Epic'
  },
  {
    id: '2',
    src: "https://reesevanderbilt.com/wp-content/uploads/2016/04/twelve-twelve-nashville-thumb.jpg",
    alt: '210 Simcoe St',
    title: 'Simcoe'
  },
  {
    id: '3',
    src: "https://cdn.strata.ca/IMG-C7227706_1.jpg",
    alt: '158 Front St E | St. Lawrence Condominiums',
    title: '608-158 Front St'
  },
  {
    id: '4',
    src: "https://buttonwood.b-cdn.net/media/024_1702-158-Front-St-E_Small-File.jpg",
    alt: '158 Front St E | St. Lawrence Condominiums',
    title: '804-158 Front St'
  },
  {
    id: '5',
    src: "https://photos.zolo.ca/2205-2221-yonge-street-toronto-C5201722-1.jpg?2021-08-25+03:45:14",
    alt: '4506-2221 Yonge St',
    title: 'Yonge'
  },
  {
    id: '6',
    src: "https://thumbs.cityrealty.com/assets/smart/736x/webp/7/7e/7e8aa96373337b1c685334c74cc2ffd0c7ed7968/360-tenth-avenue-01.jpg",
    alt: '395 Bloor St E',
    title: 'Bloor'
  },
  {
    id: '7',
    src: "https://photos.zolo.ca/1204-77-mutual-street-toronto-C5231763-3.jpg?2021-07-07+03:57:29",
    alt: '77 Mutual St',
    title: 'Mutual'
  },
  {
    id: '8',
    src: "https://shared-s3.property.ca/public/images/listings/optimized/w7376034/mls/w7376034_2-640x480.jpg?v=2",
    alt: '270 Dufferin St Toronto, ON M6K 0H8',
    title: 'Dufferin XO'
  }  
]
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel-holder.component.html',
  styleUrl: './carousel-holder.component.css'

})
export class CarouselHolderComponent {
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
      940: { items: 4 }
    },
    nav: true, 
    autoplay: true,
    autoplaySpeed: 1000
  };

  slidesStore: Slide[] = [];

  constructor() {
    this.slidesStore = SLIDE_LIST;
   }

  ngOnInit(): void {
    
  }


}

export interface Slide {
  id: string,
  src: string, 
  alt: string, 
  title: string
}