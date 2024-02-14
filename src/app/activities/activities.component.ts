import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { UtilsService } from '../utils/utils.service';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgFor
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent 
{
  activities: any

  constructor(private utilsService: UtilsService,private activityService: ActivityService) 
  {
    this.activityService.getAllActivities().subscribe({
      next: (activities) => this.activities = activities,
      error: (err) => console.error(err)
    })
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
}
