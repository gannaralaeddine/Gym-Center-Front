import { Component } from '@angular/core';
import { UtilsService } from '../../utils/utils.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { ActivityService } from '../../services/activity.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgFor
  ],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent 
{
  category: any
  categoryActivities: any

  constructor(private utilsService: UtilsService, 
    private categoryService: CategoryService,
    private activityService: ActivityService,
    private router: ActivatedRoute,
    private routerActivity: Router) {
      this.router.queryParams.subscribe((params) => {

        // get category
        this.categoryService.getCategory(params["categoryId"]).subscribe({
          next: (category) => {this.category = category; console.log(this.category)},
          error: (err) => console.error(err)
        })

        // get all related activities to actual category
        this.activityService.getAllCategoryActivities(params["categoryId"]).subscribe({
          next: (activities) => this.categoryActivities = activities,
          error: (err) => console.error(err)
        })
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

  goToActivityDetails(activityId: any)
  {
    this.routerActivity.navigate(["activity-details"], { queryParams: { activityId: activityId }  })
  }
}
