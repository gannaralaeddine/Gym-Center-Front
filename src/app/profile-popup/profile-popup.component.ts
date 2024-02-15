import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {UserService} from "../services/user.service";
import {UtilsService} from "../utils/utils.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {isPlatformBrowser, NgIf} from "@angular/common";
import {User} from "../models/User";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-profile-popup',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './profile-popup.component.html',
  styleUrl: './profile-popup.component.css'
})
export class ProfilePopupComponent
{

  user = new User()
  accountType!: string

  constructor(private userService: UserService, private utilsService: UtilsService, @Inject(PLATFORM_ID) private platformId: Object,
              private router: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any)
  {
      if(data.email)
      {
        this.getUserByEmail(data.email)
      }

  }

  ngOnInit()
  {

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
    // this.userImages = this.utilsService.deleteItemFromArray(user.userImages, user.userPicture)

    this.user.userSpeciality = user.userSpeciality

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
}
