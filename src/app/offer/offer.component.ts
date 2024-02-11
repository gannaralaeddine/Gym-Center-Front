import { Component } from '@angular/core';
import {OfferService} from "../services/offer.service";
import {MatGridListModule} from '@angular/material/grid-list';
import {NgForOf} from "@angular/common";
import {UtilsService} from "../utils/utils.service";

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [MatGridListModule, NgForOf],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})

export class OfferComponent
{

  offers: any

    constructor(private offerService: OfferService, private utilsService: UtilsService)
    {
      this.getAllCoaches()
    }

  getAllCoaches()
  {
    this.offerService.getAllOffers().subscribe({
      next: (offers) => this.offers = offers,
      error: (err) => console.error(err)
    })
  }


  getImage(imageName: string): string
  {
    if (imageName)
    {
      return this.utilsService.getImage(imageName)
    }
    else
    {
      return "../assets/img/icons/ic_person.png"
    }
  }
}
