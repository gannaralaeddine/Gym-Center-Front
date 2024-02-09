import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {UtilsService} from "../utils/utils.service";
import {OfferService} from "../services/offer.service";

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})

export class OfferComponent
{

  offers: any

    constructor(private offerService: OfferService)
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

}
