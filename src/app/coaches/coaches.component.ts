import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {CarouselModule} from "ngx-owl-carousel-o";
import {UserService} from "../services/user.service";
import {UtilsService} from "../utils/utils.service";
import {User} from "../models/User";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ProfilePopupComponent} from "../profile-popup/profile-popup.component";

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgForOf,
    CarouselModule
  ],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.css'
})
export class CoachesComponent
{

  coaches: any
  colsNumberPerLine = 4
  customOptions: any

  constructor(private userService: UserService,
    private utilsService: UtilsService,
    private router: Router,
    private matDialog: MatDialog) {
    this.customOptions = utilsService.customOptions
    this.getAllCoaches()
  }


  getAllCoaches()
  {
    this.userService.getAllCoaches().subscribe({
      next: (coaches) => this.coaches = coaches,
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

  onResize(event: any)
  {
    this.colsNumberPerLine = event.target.innerWidth <= 767 ? 1 : 4;
  }
}
