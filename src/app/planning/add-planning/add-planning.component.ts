import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PrivateSessionModule} from "../../models/privateSession.module";
import {PlanningService} from "../../services/planning.service";
import {UtilsService} from "../../utils/utils.service";
import {isPlatformBrowser, NgIf} from "@angular/common";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-planning',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-planning.component.html',
  styleUrl: './add-planning.component.css'
})
export class AddPlanningComponent implements OnInit
{
  accountType!: string
  //maxDateInput = new Date(new Date().getTime() - new Date(315569260000).getTime()).toISOString().split('T')[0]
  minDateInput = new Date(new Date().getTime() + 86400000).toString().substring(0, new Date().toString().lastIndexOf(":")+3)
  privateSessionFormValue !: FormGroup
  privateSession =  new PrivateSessionModule()
  user = new User()

  constructor(private planningService: PlanningService, private privateSessionFormBuilder: FormBuilder, private utilsService: UtilsService,
              @Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit()
  {
      if (isPlatformBrowser(this.platformId))
      {
        this.accountType = this.authService.getRolesLS()[0].authority
        this.getUserByEmail(this.authService.getEmailLS() as string)
      }
      this.privateSessionFormValue = this.privateSessionFormBuilder.group({
        privateSessionTitle: ['', Validators.required],
        privateSessionStartDateTime: ['', Validators.required],
        privateSessionEndDateTime: ['', Validators.required]
      })
      console.log("minInputDate: " + this.minDateInput)
  }

  addPrivateSession()
  {

    console.log("minInputDate: " + this.privateSessionFormValue.value.privateSessionStartDateTime.toString().substring(0, this.privateSessionFormValue.value.privateSessionStartDateTime.toString().lastIndexOf(":")+3))

      this.privateSession.privateSessionTitle =  this.privateSessionFormValue.value.privateSessionTitle
      this.privateSession.privateSessionStartDateTime =  this.privateSessionFormValue.value.privateSessionStartDateTime
      this.privateSession.privateSessionEndDateTime =  this.privateSessionFormValue.value.privateSessionEndDateTime
      this.privateSession.privateSessionCoach = this.user

      this.planningService.addPrivateSession(this.privateSession).subscribe({
        next: () => this.utilsService.successDialog("Opération réussite", "Séance a été créer avec succès", true),
        error: (err) => this.utilsService.successDialog("Opération échoué", err, false)
      })
  }

  getUserByEmail(email: string)
  {
    this.userService.retrieveUserByEmail(email).subscribe({
      next: (val: any) => {
        this.user = val as User
      },
      error: (err) => console.error(err)
    })
  }
}
