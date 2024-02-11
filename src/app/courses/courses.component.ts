import { Component } from '@angular/core';
import {UtilsService} from "../utils/utils.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {DatePipe, NgForOf} from "@angular/common";
import {SessionService} from "../services/session.service";
import {Session} from "inspector";
import {SessionModule} from "./session.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgForOf,
    DatePipe

  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent
{
    sessions: any

    constructor(private sessionService: SessionService, private utilsService: UtilsService, private router: Router)
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


  goToSessionDetails(session: SessionModule)
    {
      const params = { sessionId: session.sessionId }
      this.router.navigate(["session-details"], { queryParams: params  })
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
