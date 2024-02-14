import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent} from "@angular/material/dialog";
import {SessionService} from "../../services/session.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {UtilsService} from "../../utils/utils.service";

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    MatDialogContent
  ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.css'
})
export class SessionDetailsComponent implements OnInit
{

    session: any
    constructor(private sessionService: SessionService, private utilsService: UtilsService, @Inject(MAT_DIALOG_DATA) public data: any)
    {  }


  ngOnInit() {

      if (this.data.sessionId) {
          this.getSessionById(this.data.sessionId)
      }
  }

  getSessionById(sessionId: any)
  {
      this.sessionService.getSession(sessionId).subscribe({
        next: (session) => this.session = session,
        error: (err)=> console.error(err)
      })
  }

  getImage(imageName: string): string
  {
      return this.utilsService.getImage(imageName)
  }
}
