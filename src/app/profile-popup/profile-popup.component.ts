import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { UtilsService } from "../utils/utils.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { NgFor, NgIf } from "@angular/common";
import { User } from "../models/User";
import { FileHandleModule } from '../models/file-handle.module';
import { CardFlipComponent } from "../card-flip/card-flip.component";
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { AddImagesComponent } from '../add-images/add-images.component';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list'

@Component({
    selector: 'app-profile-popup',
    standalone: true,
    templateUrl: './profile-popup.component.html',
    styleUrl: './profile-popup.component.css',
    imports: [
      NgIf,
      NgFor,
      CardFlipComponent,
      MatGridList,
      MatGridTile,
      MatListModule
    ]
})

export class ProfilePopupComponent implements OnInit
{
  userImages: any
  userSpecialities: any
  user = new User()
  accountType!: string

  constructor(
    private userService: UserService,
    private utilsService: UtilsService,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialog,
    private router: ActivatedRoute,
    private activityRouter: Router) {}

  ngOnInit()
  {
    this.router.queryParams.subscribe((params) => {
      this.getUserByEmail(params["userEmail"])
    })
  }

  getUserByEmail(email: string)
  {
    this.userService.retrieveUserByEmail(email).subscribe({
      next: (val: any) => {
        this.user = val as User
        this.accountType = val.roles[0].roleName
        this.userImages = this.utilsService.deleteItemFromArray(this.user.userImages, this.user.userPicture)
        this.userService.retrieveCoachSpecialities(this.user.userId!).subscribe({
          next: (specialities) => this.userSpecialities = specialities,
          error: (err) => console.error(err)
        })
      },
        error: (err) => console.error(err)
    })
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
        this.ngOnInit()
        this.utilsService.successDialog("Opération réussite", "Votre image a été éditée avec succès", true)
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

  displayImages(images: any, isOneImage: boolean)
  {
    this.utilsService.displayImages(images, isOneImage)
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
    popup.afterClosed().subscribe(() => {
      this.ngOnInit()
    })
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

  goToActivityDetails(activityId: any)
  {
    this.activityRouter.navigate(["activity-details"], { queryParams: { activityId: activityId }  })
  }

}
