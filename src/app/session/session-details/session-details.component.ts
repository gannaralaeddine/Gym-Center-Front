import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent} from "@angular/material/dialog";
import {SessionService} from "../../services/session.service";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {UtilsService} from "../../utils/utils.service";
import {AuthService} from "../../auth/auth.service";
import {SessionModule} from "../session.module";

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
    userIsLoggedIn = false
    session: any

    constructor(private sessionService: SessionService, private utilsService: UtilsService, @Inject(MAT_DIALOG_DATA) public data: any,
                private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object)
    {  }


    ngOnInit() {

        this.userIsLoggedIn = !!(this.isLoggedIn() && this.authService.getEmailLS());

        if (this.data.sessionId) {
            this.getSessionById(this.data.sessionId)
        }
    }

    isLoggedIn(): boolean
    {
      if (isPlatformBrowser(this.platformId))
      {
        return this.authService.isLoggedIn()
      }
      return false
    }

    getSessionById(sessionId: any)
    {
        this.sessionService.getSession(sessionId).subscribe({
          next: (session) => this.session = session,
          error: (err)=> console.error(err)
        })
    }

    participateToSession(session: SessionModule)
    {
      if (isPlatformBrowser(this.platformId)) {
        if (this.authService.getEmailLS() != null)
        {
          this.sessionService.assignMemberToSession(this.authService.getEmailLS() as string, session.sessionId).subscribe({
            next: () => this.utilsService.successDialog("Opération réussite", "Vous avez participer avec succès", true),
            error: (err) => {
              switch (err.status)
              {
                case 200:
                { this.utilsService.successDialog("Opération réussite", "Vous avez participer avec succès", true); break }
                case 302:
                { this.utilsService.successDialog("Opération échouée", "Vous avez déja participer à ce classe", false); break }
                case 404:
                { this.utilsService.successDialog("Opération échouée", "Essayer plus tard", false); break }
                case 406:
                { this.utilsService.successDialog("Opération échouée", "Il n'ya pas encore des places disponible dans ce classe !", false); break }
                default:
                { this.utilsService.successDialog("Opération échouée", err.message, false); break }

              }
            }

          })
        }
      }
    }
    getImage(imageName: string): string
    {
        return this.utilsService.getImage(imageName)
    }
}
