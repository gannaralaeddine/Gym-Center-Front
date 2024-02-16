import { Component, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivityService } from '../services/activity.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor } from '@angular/common';
import {UserService} from "../services/user.service";
import {SessionService} from "../services/session.service";
import {FileHandleModule} from "../models/file-handle.module";
import {UtilsService} from "../utils/utils.service";

@Component({
  selector: 'app-add-images',
  standalone: true,
  imports: [MatGridListModule, NgFor],
  templateUrl: './add-images.component.html',
  styleUrl: './add-images.component.css'
})
export class AddImagesComponent
{
  classId: number
  imagesTag!: string
  images!: FileHandleModule[]

  constructor(private activityService: ActivityService, private userService: UserService, private sessionService: SessionService,
              private utilsService: UtilsService,
              private sanitizer: DomSanitizer, private dialogRef: MatDialogRef<AddImagesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.classId = data.id
    this.imagesTag = data.imagesTag
  }

  addImages(id: number)
  {
    if(this.images && this.images.length > 0)
    {
      const formData =  this.prepareFormData( id )

      this.addImagesToUserProfile(formData)

    }
    else
    {
      console.log("images not selected")
    }
  }


  prepareFormData(id: number): FormData
  {
    const formData = new FormData()

    formData.append(
      "id", new Blob( [ JSON.stringify( id )  ], { type: "application/json" } )
    )

    for ( let i = 0 ; i < this.images.length ; i++ )
    {
      formData.append(
        "imageFile",
        this.images[i].file,
        this.images[i].file.name
      )
    }
    return formData
  }

  onFileSelected(event: any)
  {
    this.images = []

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
        this.images.push(fileHandle)

      }
    }

    this.checkImages()
  }

  removeImage(index: number)
  {
    this.images.splice(index, 1)
    this.checkImages()
  }

  fileDropped(fileHandle: any)
  {
    this.images.push(fileHandle)
  }

  public onDragLeave(event: DragEvent)
  {
    console.log("onDragLeave")
    event.preventDefault()
    event.stopPropagation()
  }


  public onDragOver(event: DragEvent)
  {
    console.log("dragover")
    event.preventDefault()
    event.stopPropagation()

  }

  addImagesToUserProfile(formData: FormData)
  {
    this.userService.addImagesToUserProfile(formData).subscribe({
      next:(val)=> {
        console.log("Opération réussite: " + val)
        this.dialogRef.close()
        this.utilsService.successDialog("Opération réussite", "Images ajoutée avec succès", true)

      },
      error: (err)=> this.utilsService.successDialog("Opération échouée", err.message, false)
    })
  }

  checkImages()
  {
    if (this.images && this.images.length > 0)
    {
      document.getElementById('addImages')?.removeAttribute('disabled')
    }
    else
    {
      document.getElementById('addImages')?.setAttribute('disabled','')
    }
  }
}


