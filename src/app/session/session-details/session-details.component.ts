import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
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
    userIsParticipated = false
    session: any

    constructor(private sessionService: SessionService, private utilsService: UtilsService, @Inject(MAT_DIALOG_DATA) public data: any,
                private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object, private dialogRef: MatDialogRef<SessionDetailsComponent>,)
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
          complete: () =>  this.isParticipated(this.session.sessionId),
          error: (err)=> console.error(err)
        })
    }


    isParticipated(sessionId: number)
    {
        if (isPlatformBrowser(this.platformId))
        {
          if (this.authService.getEmailLS() != null)
          {
            this.sessionService.isMemberParticipatedToSession(this.authService.getEmailLS() as string, sessionId).subscribe({
              next: (result) => this.userIsParticipated = result as boolean,
              error: (err) => console.log("error: " + err.message)
            })
          }
        }
    }

    participateToSession(session: SessionModule)
    {
      if (isPlatformBrowser(this.platformId)) {
        if (this.authService.getEmailLS() != null)
        {
          this.sessionService.assignMemberToSession(this.authService.getEmailLS() as string, session.sessionId).subscribe({
            next: () => {
              this.dialogRef.close()
              this.utilsService.successDialog("Opération réussite", "Vous avez participer avec succès", true)
            },
            error: (err) => {
              switch (err.status)
              {
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


    cancelParticipationToSession(session: SessionModule)
    {
      if (isPlatformBrowser(this.platformId))
      {
        if (this.authService.getEmailLS() != null)
        {
          this.sessionService.removeMemberFromSession(this.authService.getEmailLS() as string, session.sessionId).subscribe({
            next: () => {
              this.dialogRef.close()
              this.utilsService.successDialog("Opération réussite", "Participation annulée avec succès", true)
            },
            error: (err) => {
              switch (err.status)
              {
                case 404:
                { this.utilsService.successDialog("Opération échouée", "Essayer plus tard", false); break }
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
