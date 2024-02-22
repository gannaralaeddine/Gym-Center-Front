import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {User} from "../models/User";
import {UtilsService} from "../utils/utils.service";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
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
import {MatSort} from "@angular/material/sort";
import { SessionDetailsComponent } from '../session/session-details/session-details.component';
import { MatSelectModule } from '@angular/material/select';

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
  userSessions: any
  dataSource!: MatTableDataSource<any>
  displayedColumns = ['Image', 'Titre', 'Activité', 'Coach', 'Places Réservées', 'Gestion']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  pages = [5, 10, 25, 100]

  constructor(private userService: UserService,
    private utilsService: UtilsService,
    private authService: AuthService,
    private dialogRef: MatDialog,
    private sanitizer: DomSanitizer,
    private profileFormBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit()
  {
    this.profileFormValue = this.profileFormBuilder.group({
      userFirstName : ['',Validators.required],
      userLastName : ['',Validators.required],
      userDescription : ['',Validators.required],
      userPhoneNumber:['',Validators.required],
      userCountry:['',Validators.required],
      userCity:['',Validators.required],
      userState:['',Validators.required],
      userZipCode:['',Validators.required],
      userHeight:['',Validators.required],
      userWeight:['',Validators.required],
      userGender: ['Merci de choisir sexe',Validators.required],
      userBirthDate: ['',Validators.required],
      userPicture: ""
    })
    if (isPlatformBrowser(this.platformId)) {
      this.getUserByEmail(this.authService.getEmailLS() as string)
      this.retrieveMemberSessions(this.authService.getEmailLS() as string)
    }

  }

  getUserByEmail(email: string)
  {
    this.userService.getMemberByEmail(email).subscribe(
      {
        next: (user) => {
          this.populateUserData(user)
          this.populateForm(user)
        },
        error: (err) => console.error(err)
      }
    )
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

  previewProfileImage(imageName: any, isOneImage: boolean)
  {
    this.utilsService.displayImages(imageName, isOneImage)
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
        this.getUserByEmail(this.authService.getEmailLS() as string)
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


  retrieveMemberSessions(email: string)
  {
      this.userService.retrieveMemberSessions(email).subscribe({
        next: (sessions) => {
          this.dataSource = new MatTableDataSource(sessions as any)
          this.dataSource.paginator = this.paginator
        },
        error: (err) => console.error(err)
      })
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
      this.getUserByEmail(this.authService.getEmailLS() as string)
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
  }
}
