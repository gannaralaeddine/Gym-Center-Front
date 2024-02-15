import {Component} from '@angular/core';
import {User} from "../models/User";
import {UtilsService} from "../utils/utils.service";
import {DatePipe, NgForOf} from "@angular/common";
import {UserService} from "../services/user.service";
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {RouterLink} from "@angular/router";
import {CardFlipComponent} from "../card-flip/card-flip.component";
import {FileHandleModule} from "../models/file-handle.module";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DatePipe,
    FullCalendarModule,
    MatGridList,
    MatGridTile,
    NgForOf,
    RouterLink,
    CardFlipComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent
{
  user = new User()
  accountType!: string
  userImages: any

  constructor(private userService: UserService, private utilsService: UtilsService, private sanitizer: DomSanitizer)
  {

  }

  ngOnInit()
  {
      this.getUserByEmail("gannarala@gmail.com")
  }

  getUserByEmail(email: string)
  {
    this.userService.retrieveUserByEmail(email).subscribe(
      {
        next: (val) => this.populateUserData(val),
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
      return "../assets/img/icons/ic_person.png"
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
    const formData = this.prepareFormData(this.user)

    this.userService.updateProfilePicture(formData).subscribe({
      complete: () => {
        this.getUserByEmail("gannarala@gmail.com")
        this.utilsService.successDialog("Opération réussite", "Votre image a été éditer avec succès", true)
      },
      error:(err)=> this.utilsService.successDialog("Opération échouée", err.message, false)
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

}
