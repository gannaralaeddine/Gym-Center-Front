import { Injectable } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {MatDialog} from "@angular/material/dialog";
import {ImagesPopupComponent} from "../images-popup/images-popup.component";
import {AlertDeleteComponent} from "../alert-delete/alert-delete.component";
import {AlertSuccessComponent} from "../alert-success/alert-success.component";

@Injectable({
  providedIn: 'root'
})
export class UtilsService
{

  public API_GYM_CENTER = "http://localhost:8089/gym-center"

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoWidth: true,
    margin: 5,
    navSpeed: 1000,
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
    nav: false,
    autoplay: true,
    autoplayHoverPause: true
  }

  constructor(private matDialog: MatDialog) { }


  public getImage(imageName: string): string { return this.API_GYM_CENTER + "/image/get-image/" + imageName }


  displayImages(images: any, isOneImage: boolean)
  {
    return this.matDialog.open(ImagesPopupComponent, {
      width: "60%",
      height: "80%",
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { images: images,  isOneImage: isOneImage}
    })
  }

  deletePopup(){
    return  this.matDialog.open(AlertDeleteComponent, {
      width: "40%",
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "500ms",
      data: { title:  "Supprimer image", message: "Voulez-vous vraiment supprimer cette image ?" }
    })
  }

  public deleteItemFromArray(array: any, imageName: any)
  {
    return array.filter((element: any) => {
      return element.imageName !== imageName;
    });
  }

  successDialog(title: string, message: string, operationStatus: boolean){
    this.matDialog.open(AlertSuccessComponent, {
      width: "40%",
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { title:  title, message: message, operationStatus: operationStatus }
    })
  }
}
