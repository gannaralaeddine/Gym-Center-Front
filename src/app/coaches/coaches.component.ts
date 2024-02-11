import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {CarouselModule} from "ngx-owl-carousel-o";
import {UserService} from "../services/user.service";
import {UtilsService} from "../utils/utils.service";

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

  constructor(private userService: UserService, private utilsService: UtilsService)
  {
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

}
