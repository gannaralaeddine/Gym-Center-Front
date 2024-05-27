import {Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {User} from "../models/User";
import {UtilsService} from "../utils/utils.service";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf, registerLocaleData} from "@angular/common";
import {UserService} from "../services/user.service";
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {RouterLink} from "@angular/router";
import {CardFlipComponent} from "../card-flip/card-flip.component";
import {FileHandleModule} from "../models/file-handle.module";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {AddImagesComponent} from "../add-images/add-images.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import { SessionDetailsComponent } from '../session/session-details/session-details.component';
import { MatSelectModule } from '@angular/material/select';
import { SessionModule } from '../session/session.module';
import localeFr from '@angular/common/locales/fr';
import {PlanningService} from "../services/planning.service";

registerLocaleData(localeFr);

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    FullCalendarModule,
    MatGridList,
    MatGridTile,
    MatPaginatorModule,
    MatTableModule,
    NgForOf,
    RouterLink,
    CardFlipComponent,
    FormsModule,
    NgIf,
    MatSelectModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'} ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit
{
  user = new User()
  accountType!: string
  userImages: any
  profileFormValue !: FormGroup
  maxDateInput = new Date(new Date().getTime() - new Date(315569260000).getTime()).toISOString().split('T')[0]
  userSessionDataSource!: MatTableDataSource<any>
  privateSessionsDataSource!: MatTableDataSource<any>

  displayedColumnsSession = ['Image', 'Titre', 'Activité', 'Coach', 'Places Réservées', 'Date', 'Gestion']
  displayedColumnsPrivateSession!: string[]

  @ViewChild('paginator') paginator!: MatPaginator
  @ViewChild('privateSessionsPaginator') privateSessionsPaginator!: MatPaginator

  colsNumberPerLine = 4

  constructor(private userService: UserService, private utilsService: UtilsService, private authService: AuthService, private dialogRef: MatDialog,
    private sanitizer: DomSanitizer, private profileFormBuilder: FormBuilder, private matDialog: MatDialog,
              @Inject(PLATFORM_ID) private platformId: Object, private planningService: PlanningService) { }

  ngOnInit()
  {
        this.profileFormValue = this.profileFormBuilder.group({
          userFirstName: ['', Validators.required],
          userLastName: ['', Validators.required],
          userDescription: ['', Validators.required],
          userPhoneNumber: ['', Validators.required],
          userCountry: ['', Validators.required],
          userCity: ['', Validators.required],
          userState: ['', Validators.required],
          userZipCode: ['', Validators.required],
          userHeight: ['', Validators.required],
          userWeight: ['', Validators.required],
          userGender: ['Merci de choisir sexe', Validators.required],
          userBirthDate: ['', Validators.required],
          userPicture: ""
        })

        if (isPlatformBrowser(this.platformId))
        {
            this.accountType = this.authService.getRolesLS()[0].authority
            if(this.accountType === "ROLE_MEMBER")
            {
              this.displayedColumnsPrivateSession = ['Titre', 'Date', 'Heure', 'Coach']
            }
            if(this.accountType === "ROLE_COACH")
            {
              this.displayedColumnsPrivateSession = ['Titre', 'Date', 'Heure', 'Membre', 'Gestion']
            }
            this.getUser(this.authService.getEmailLS() as string, this.authService.getRolesLS()[0].authority)

            this.retrieveUserSessions(this.authService.getEmailLS() as string, this.authService.getRolesLS()[0].authority)

            this.getPrivateSessions(this.authService.getEmailLS() as string, this.authService.getRolesLS()[0].authority)
        }
  }

  populateUserData(user: any)
  {
    this.accountType = user.roles[0].roleName

    this.user.userId = user.userId
    this.user.userEmail = user.userEmail
    this.user.userFirstName = user.userFirstName
    this.user.userLastName = user.userLastName
    this.user.userDescription = user.userDescription
    this.user.userPhoneNumber = user.userPhoneNumber
    this.user.userCountry = user.userCountry
    this.user.userState = user.userState
    this.user.userCity = user.userCity
    this.user.userGender = user.userGender
    this.user.userHeight = user.userHeight
    this.user.userWeight = user.userWeight
    this.user.userZipCode = user.userZipCode
    this.user.userBirthDate = user.userBirthDate
    this.user.userPicture = user.userPicture
    this.userImages = this.utilsService.deleteItemFromArray(user.userImages, user.userPicture)
  }

  getImage(userPicture: any)
  {
    if (userPicture)
    {
      return this.utilsService.getImage(userPicture)
    }
    else
    {
      return "../assets/img/icons/ic_person.svg"
    }
  }

  detectChanges(isDataChanges: boolean)
  {
    if (isDataChanges)
    {
      this.userService.getUserById(this.user.userId).subscribe(
        {
          next: (user) => this.userImages = this.utilsService.deleteItemFromArray(user.userImages, user.userPicture),
          error: (err) => console.error(err)
        }
      )
    }
  }

  displayImages(images: any, isOneImage: boolean)
  {
    this.utilsService.displayImages(images, isOneImage)
  }

  onFileSelected(event: any)
  {
    this.user.userImages = []

    if (event.target.files)
    {
      for (let i= 0 ; i < event.target.files.length ; i++)
      {
        const file = event.target.files[i]

        const fileHandle: FileHandleModule = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          )
        }

        this.user.userImages.push(fileHandle)

      }
    }

    this.updateProfileImage()
  }

  updateProfileImage()
  {
    console.log(this.user.userImages, this.user.userImages.length)
    const formData = this.prepareFormData(this.user)

    this.userService.updateProfilePicture(formData).subscribe({
      complete: () => {
        this.getUser(this.authService.getEmailLS() as string, this. authService.getRolesLS()[0].authority )
        this.utilsService.successDialog("Opération réussite", "Votre image a été éditée avec succès", true)
      },
      error:(err)=> this.utilsService.successDialog("Opération échouée", err.message, false)
    })
  }

  updateProfile()
  {
    this.user.userFirstName =  this.profileFormValue.controls['userFirstName'].value
    this.user.userLastName =  this.profileFormValue.controls['userLastName'].value
    this.user.userDescription =  this.profileFormValue.controls['userDescription'].value
    this.user.userPhoneNumber =  this.profileFormValue.controls['userPhoneNumber'].value
    this.user.userCountry =  this.profileFormValue.controls['userCountry'].value
    this.user.userCity =  this.profileFormValue.controls['userCity'].value
    this.user.userState =  this.profileFormValue.controls['userState'].value
    this.user.userZipCode =  this.profileFormValue.controls['userZipCode'].value
    this.user.userHeight =  this.profileFormValue.controls['userHeight'].value
    this.user.userWeight =  this.profileFormValue.controls['userWeight'].value
    this.user.userBirthDate =  this.profileFormValue.controls['userBirthDate'].value
    this.user.userGender = this.profileFormValue.controls['userGender'].value

    this.userService.updateUserData(this.user).subscribe({
      complete: () => {
        // this.dialogRef.close()
        this.utilsService.successDialog("Opération réussite", "Vos informations ont été modifié avec succès", true)
      },
      error: (err) => this.utilsService.successDialog("Opération échoué", err, false)
    })

  }

  prepareFormData(user: User): FormData
  {
    const formData = new FormData()

    formData.append(
      "user", new Blob( [ JSON.stringify(user) ], { type: "application/json" } )
    )

    for ( let i = 0 ; i < user.userImages.length ; i++ )
    {
      formData.append(
        "imageFile",
        user.userImages[i].file,
        user.userImages[i].file.name
      )
    }

    return formData
  }

  populateForm(user: any)
  {
    if (user.userGender == "Homme")
    {
      this.profileFormValue.controls['userGender'].setValue("Homme")
    }
    if (user.userGender == "Femme")
    {
      this.profileFormValue.controls['userGender'].setValue("Femme")
    }
    this.profileFormValue.controls['userFirstName'].setValue(user.userFirstName)
    this.profileFormValue.controls['userLastName'].setValue(user.userLastName)
    this.profileFormValue.controls['userDescription'].setValue(user.userDescription)
    this.profileFormValue.controls['userPhoneNumber'].setValue(user.userPhoneNumber)
    this.profileFormValue.controls['userCountry'].setValue(user.userCountry)
    this.profileFormValue.controls['userCity'].setValue(user.userCity)
    this.profileFormValue.controls['userState'].setValue(user.userState)
    this.profileFormValue.controls['userZipCode'].setValue(user.userZipCode)
    this.profileFormValue.controls['userHeight'].setValue(user.userHeight)
    this.profileFormValue.controls['userWeight'].setValue(user.userWeight)
    if (user.userBirthDate)
    {
      this.profileFormValue.controls['userBirthDate'].setValue(this.parseDateString(user.userBirthDate))
    }
  }

  parseDateString(dateString: string): string {
    // Extract the date part in 'yyyy-MM-dd' format
    return  dateString.split('T')[0];
  }


  retrieveUserSessions(email: string, role: string)
  {
      if (role === "ROLE_MEMBER")
      {
          this.userService.retrieveMemberSessions(email).subscribe({
          next: (sessions) => {
            this.userSessionDataSource = new MatTableDataSource(sessions as any)
            setTimeout(() => this.userSessionDataSource.paginator = this.paginator)
            this.userSessionDataSource.data.sort((a: SessionModule, b: SessionModule): number => {

              let result!: number

              if (a.sessionDeadline > b.sessionDeadline) {
                result = 1
              } else if (a.sessionDeadline < b.sessionDeadline) {
                result = -1
              }

              return result
            })
          },
          error: (err) => console.error(err)
        })
      }
      else if (role === "ROLE_COACH")
      {
          this.userService.retrieveCoachSessions(email).subscribe({
          next: (sessions) => {
            this.userSessionDataSource = new MatTableDataSource(sessions as any)
            setTimeout(() => this.userSessionDataSource.paginator = this.paginator)
            this.userSessionDataSource.data.sort((a: SessionModule, b: SessionModule): number => {

              let result!: number

              if (a.sessionDeadline > b.sessionDeadline) {
                result = 1
              } else if (a.sessionDeadline < b.sessionDeadline) {
                result = -1
              }

              return result
            })
          },
          error: (err) => console.error(err)
        })
      }
  }

  addImages()
  {
    const popup = this.dialogRef.open(AddImagesComponent, {
      width: "50%",
      height: "80%",
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { imagesTag: "userProfile", id: this.user.userId }
    })
    popup.afterClosed().subscribe(() =>{
      this.getUser(this.authService.getEmailLS() as string, this. authService.getRolesLS()[0].authority)
    })
  }

  showSessionDetails(id: any)
  {
    this.dialogRef.open(SessionDetailsComponent, {
      width: "70%",
      height: "80%",
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { sessionId: id }
    })
    .afterClosed().subscribe(() =>{
      this.retrieveUserSessions(this.authService.getEmailLS() as string, this. authService.getRolesLS()[0].authority)
    })
  }


  getUser(email: string, role: string)
  {

      if (role === "ROLE_MEMBER")
      {
        this.userService.getMemberByEmail(email).subscribe(
          {
            next: (user) => {
              this.populateUserData(user)
              this.populateForm(user)
            },
            error: (err) => console.error(err)
          })
      }
      else if (role === "ROLE_COACH")
      {
        this.userService.getCoachByEmail(email).subscribe(
          {
            next: (user) => {
              this.populateUserData(user)
              this.populateForm(user)
            },
            error: (err) => console.error(err)
          }
        )
      }
  }

  onResize(event: any)
  {
    this.colsNumberPerLine = event.target.innerWidth <= 767 ? 1 : 4;
  }


  getPrivateSessions(email: string, role: string)
  {

    if (role === "ROLE_COACH")
    {
        this.userService.getCoachPrivateSessions(email).subscribe({
          next: (privateSessions) => {
            this.privateSessionsDataSource = new MatTableDataSource(privateSessions as any)
            setTimeout(() => this.privateSessionsDataSource.paginator = this.privateSessionsPaginator)
          },
          error: (err) => console.error(err)
        })
    }
    else if(role === "ROLE_MEMBER")
    {
        this.userService.getMemberPrivateSessions(email).subscribe({
          next: (privateSessions) => {
            this.privateSessionsDataSource = new MatTableDataSource(privateSessions as any)
            setTimeout(() => this.privateSessionsDataSource.paginator = this.privateSessionsPaginator)
          },
          error: (err) => console.error(err)
        })
    }
  }

  cancelBooking(memberEmail: string, privateSessionId: number)
  {
    this.utilsService.alertPrompt("Annuler réservation", "Êtes-vous sûr de vouloir annuler cette réservation ?", "confirmOperation")
      .afterClosed().subscribe((confirmOperation) => {
      if (confirmOperation) {
        this.planningService.cancelPrivateSession(memberEmail, privateSessionId).subscribe({
          next: () => this.utilsService.successDialog("Opération réussite", "Cette séance à été annuler avec succès", true),
          error: (err) => this.utilsService.successDialog("Opération échouée", err.message, false)
        })
      }
    })
  }

}
