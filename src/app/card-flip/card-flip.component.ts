import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ActivityService} from "../services/activity.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../services/user.service";
import {SessionService} from "../services/session.service";
import {UtilsService} from "../utils/utils.service";

@Component({
  imports: [ NgOptimizedImage, NgIf ],
  selector: 'app-card-flip',
  standalone: true,
  styleUrl: './card-flip.component.css',
  templateUrl: './card-flip.component.html',
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class CardFlipComponent
{
  @Input()imageName: any
  @Input()classId: any
  @Input()classToDelete: any
  @Output() onDataChange = new EventEmitter<boolean>();

  flip: string = 'inactive';

  constructor(private activityService: ActivityService, private userService: UserService, private sessionService: SessionService,
              private matDialog: MatDialog, private utilsService: UtilsService) {  }


  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }


  getActivityImage(imageName: string)
  {
    return this.utilsService.getImage(imageName)
  }


  deleteImage()
  {
    this.utilsService.alertPrompt("Supprimer image", "Voulez-vous vraiment supprimer cette image ?", "deleteOperation")
      .afterClosed().subscribe(isYesOperation => {
      if (isYesOperation) {
        this.userService.deleteUserImage(this.classId, this.imageName).subscribe({
          next: () => this.onDataChange.emit(true) ,
          error: (err) => console.log("Error deleting user image" + err)
        })
      }
    })
  }

}
