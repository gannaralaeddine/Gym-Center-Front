import { Injectable } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";

@Injectable({
  providedIn: 'root'
})
export class UtilsService
{

  public API_GYM_CENTER = "http://localhost:8089/gym-center"

  constructor() { }


  public getImage(imageName: string): string { return this.API_GYM_CENTER + "/image/get-image/" + imageName }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,

    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true,
    autoplay: true
  }
}
