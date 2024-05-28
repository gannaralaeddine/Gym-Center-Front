import {Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DatePipe, isPlatformBrowser, NgIf, registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {UtilsService} from "../../utils/utils.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../auth/auth.service";
import {DialogRef} from "@angular/cdk/dialog";
import {SessionService} from "../../services/session.service";
import {PrivateSessionModule} from "../../models/privateSession.module";
import {PlanningService} from "../../services/planning.service";

registerLocaleData(localeFr);
@Component({
  selector: 'app-details-planning',
  standalone: true,
  imports: [
    DatePipe,
    NgIf
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'} ],
  templateUrl: './details-planning.component.html',
  styleUrl: './details-planning.component.css'
})
export class DetailsPlanningComponent implements OnInit
{
  session!: PrivateSessionModule
  connectedUserEmail!: string
  privateSessionId!: number

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private utilsService: UtilsService, private authService: AuthService,
               private userService: UserService, @Inject(PLATFORM_ID) private platformId: Object, private planningService: PlanningService,
               private dialogRef: DialogRef<DetailsPlanningComponent>,) {
  }

  ngOnInit()
  {
      if (isPlatformBrowser(this.platformId))
      {
        this.connectedUserEmail = this.authService.getEmailLS() as string
      }
      if (this.data)
      {
        this.privateSessionId = this.data.id
        this.populateData(this.data.id)
      }
  }

  bookingCoach()
  {
    this.utilsService.alertPrompt("Réservation coach", "Êtes-vous sûr de vouloir envoyé réserver ce coach ?", "confirmOperation")
      .afterClosed().subscribe((confirmOperation) => {
      if (confirmOperation)
      {
        this.userService.privateCoachBooking(this.connectedUserEmail, this.privateSessionId).subscribe({
          next: () => {
            this.dialogRef.close()
            this.utilsService.successDialog("Opération réussite", "Réservation réussite", true)
          },
          error: (err) => {
            this.dialogRef.close()
            if (err.status == 404)
            {
              this.utilsService.successDialog("Opération échouée", "Une erreur est survenue veuillez essayer plus tard !", false);
            }
            else
            {
              this.utilsService.successDialog("Opération échouée", err.message, false);
            }
          }
        })
      }
    })
  }

  private populateData(id: number)
  {
      this.planningService.retrievePrivateSession(id).subscribe({
        next: (session) => this.session = session as PrivateSessionModule ,
        error: (err)=> console.error(err)
      })
  }
}
