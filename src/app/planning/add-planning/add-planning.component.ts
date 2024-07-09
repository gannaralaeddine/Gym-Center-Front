import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PrivateSessionModule} from "../../models/privateSession.module";
import {PlanningService} from "../../services/planning.service";
import {UtilsService} from "../../utils/utils.service";
import {isPlatformBrowser, NgIf} from "@angular/common";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import { MOMENT } from 'angular-calendar';

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
  startTime!: String[]
  endTime!: String[]
  isGreaterThan = true
  privateSessionFormValue !: FormGroup
  privateSession =  new PrivateSessionModule()
  user = new User()

  constructor(
    private planningService: PlanningService, 
    private privateSessionFormBuilder: FormBuilder, 
    private utilsService: UtilsService,
    @Inject(PLATFORM_ID) private platformId: Object, 
    private authService: AuthService, 
    private userService: UserService) {}

  ngOnInit()
  {
      if (isPlatformBrowser(this.platformId))
      {
        this.accountType = this.authService.getRolesLS()[0].authority
        this.getUserByEmail(this.authService.getEmailLS() as string)
      }
      this.privateSessionFormValue = this.privateSessionFormBuilder.group({
        privateSessionTitle: ['', Validators.required],
        privateSessionDate: ['', Validators.required],
        privateSessionStartTime: ['', Validators.required],
        privateSessionEndTime: ['', Validators.required]
      })
  }

  addPrivateSession()
  {
      this.privateSession.privateSessionTitle =  this.privateSessionFormValue.value.privateSessionTitle
      this.privateSession.privateSessionStartDateTime =  this.privateSessionFormValue.value.privateSessionDate + "T" + this.privateSessionFormValue.value.privateSessionStartTime
      this.privateSession.privateSessionEndDateTime =  this.privateSessionFormValue.value.privateSessionDate + "T" + this.privateSessionFormValue.value.privateSessionEndTime
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

  checkValidityForm()
  {
    if (this.privateSessionFormValue.controls['privateSessionTitle'].invalid && this.privateSessionFormValue.controls['privateSessionTitle'].touched)
    {
      document.getElementById('privateSessionTitle')!.className = "form-control border border-danger pl-2 round"
    }
    else
    {
      document.getElementById('privateSessionTitle')!.className = "form-control border border-dark pl-2 round"
    }

    if (this.privateSessionFormValue.controls['privateSessionDate'].invalid && this.privateSessionFormValue.controls['privateSessionDate'].touched)
    {
      document.getElementById('privateSessionDate')!.className = "form-control border border-danger pl-2 round"
    }
    else
    {
      document.getElementById('privateSessionDate')!.className = "form-control border border-dark pl-2 round"
    }

    if (this.privateSessionFormValue.controls['privateSessionStartTime'].invalid && this.privateSessionFormValue.controls['privateSessionStartTime'].touched)
    {
      document.getElementById('privateSessionStartTime')!.className = "form-control border border-danger pl-2 round"
    }
    else
    {
      document.getElementById('privateSessionStartTime')!.className = "form-control border border-dark pl-2 round"
    }

    if (this.privateSessionFormValue.controls['privateSessionEndTime'].invalid && this.privateSessionFormValue.controls['privateSessionEndTime'].touched)
    {
      document.getElementById('privateSessionEndTime')!.className = "form-control border border-danger pl-2 round"
    }
    else
    {
      document.getElementById('privateSessionEndTime')!.className = "form-control border border-dark pl-2 round"
    }

    //enabke or disable add button
    if (this.privateSessionFormValue.controls['privateSessionTitle'].valid && this.privateSessionFormValue.controls['privateSessionStartTime'].valid && this.privateSessionFormValue.controls['privateSessionEndTime'].valid && this.privateSessionFormValue.controls['privateSessionDate'].valid && this.isGreaterThan)
    {
     
      document.getElementById("addButton")?.removeAttribute("disabled")
    }
    else
    {
      document.getElementById("addButton")?.setAttribute("disabled","")
    }
  }

  compareBetweenStartAndEndDate()
  {
    if (this.startTime && this.endTime)
    {
      if (Number(this.startTime[0]) >= Number(this.endTime[0]))
      {
        this.isGreaterThan = false
      }
      else
      {
        this.isGreaterThan = true
      }
    }
  }

  showDatePicker()
  {
    //const dateInput = document.getElementById('privateSessionDate')
    // this.privateSessionFormValue.controls['privateSessionDate'].f
    
    // const dateInput = document.getElementById('privateSessionDate')
    // dateInput?.addEventListener("click", (event: any) => {
    //   const input = event.srcElement.previousElementSibling;
    //   try 
    //   {
    //     input.showPicker();
    //   } 
    //   catch (error) 
    //   {
    //     window.alert(error);
    //   }
    // });
    
  }
}
