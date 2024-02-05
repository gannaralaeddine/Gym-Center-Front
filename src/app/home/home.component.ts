import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {NgForOf} from "@angular/common";
import {UtilsService} from "../utils/utils.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent
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
