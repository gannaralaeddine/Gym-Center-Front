import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { UtilsService } from '../../utils/utils.service';
import { NgFor, NgIf } from '@angular/common';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ProfilePopupComponent } from '../../profile-popup/profile-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-activity-details',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgFor,
    NgIf
  ],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css'
})

export class ActivityDetailsComponent 
{
  activity: any

  constructor(private utilsService: UtilsService, 
    private router: ActivatedRoute,
    private dialogRef: MatDialog,
    private activityService: ActivityService,
    private routerCategory: Router) {
    this.router.queryParams.subscribe((params) => {
      this.activityService.getActivity(params["activityId"]).subscribe({
        next: (activity) => {this.activity = activity; console.log(this.activity)},
        error: (err) => console.error(err)
      })
    })
  }

  goToCategoryDetails(categoryId: any) 
  {
    this.routerCategory.navigate(["category-details"], { queryParams: { categoryId: categoryId }  })
  }

  getImage(imageName: string): string
  {
    if (imageName)
    {
      return this.utilsService.getImage(imageName)
    }
    else
    {
      return "../assets/img/icons/ic_person.png"
    }
  }

  goToCoachProfile(coach: any)
  {
    return this.dialogRef.open(ProfilePopupComponent, {
      width: "70%",
      height: "80%",
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { email: coach.userEmail}
    })
  }
}
