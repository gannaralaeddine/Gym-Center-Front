import { Component } from '@angular/core';
import {UtilsService} from "../utils/utils.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {SessionService} from "../services/session.service";

@Component({
  selector: 'app-courses',
  standalone: true,
    imports: [
        MatGridList,
        MatGridTile,
        NgForOf

    ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent
{
    sessions: any

    constructor(private sessionService: SessionService, private utilsService: UtilsService)
    {
      this.getAllSessions()
    }


    getAllSessions()
    {
      this.sessionService.getAllSessions().subscribe({
        next: (sessions) => this.sessions = sessions,
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
