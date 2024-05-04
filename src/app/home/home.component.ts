import {Component} from '@angular/core';
import {UserService} from "../services/user.service";
import {NgForOf} from "@angular/common";
import {UtilsService} from "../utils/utils.service";
import {CarouselModule} from "ngx-owl-carousel-o";
import {OfferService} from "../services/offer.service";
import {RouterLink} from "@angular/router";
import {User} from "../models/User";
import {ProfilePopupComponent} from "../profile-popup/profile-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    CarouselModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent
{
    coaches: any
    offers: any
    customOptions: any

    constructor(private userService: UserService, private offerService: OfferService, private utilsService: UtilsService,
                private matDialog: MatDialog)
    {
        this.customOptions = utilsService.customOptions
        this.getAllCoaches()
        this.getAllOffers()
    }


    getAllCoaches()
    {
        this.userService.getAllCoaches().subscribe({
          next: (coaches) => this.coaches = coaches,
          error: (err) => console.error(err)
        })
    }


    getAllOffers()
    {
        this.offerService.getAllOffers().subscribe({
          next: (offer) => this.offers = offer,
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

    goToCoachProfile(user: User)
    {
      return this.matDialog.open(ProfilePopupComponent, {
        width: "70%",
        height: "100%",
        enterAnimationDuration: "1000ms",
        exitAnimationDuration: "1000ms",
        data: { email: user.userEmail}
      })
    }
}
