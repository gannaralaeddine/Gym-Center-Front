import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-details',
  standalone: true,
  imports: [],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css'
})

export class ActivityDetailsComponent 
{
  activity: any

  constructor(private router: ActivatedRoute, private activityService: ActivityService)
  {
    this.router.queryParams.subscribe((params) => {
      this.activityService.getActivity(params["activityId"]).subscribe({
        next: (activity) => {this.activity = activity},
        error: (err) => console.error(err)
      })
    })
  }
}
