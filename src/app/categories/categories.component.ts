import { Component } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UtilsService } from '../utils/utils.service';
import { CategoryService } from '../services/category.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    CarouselModule,
    NgFor
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent 
{
  categories: any
  colsNumberPerLine = 4

  constructor(private utilsService: UtilsService,
    private router: Router,
    private categoryService: CategoryService) {

    this.categoryService.getAllCategories().subscribe({
      next: (categories) => this.categories = categories,
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

  goToCategoryDetails(categoryId: any)
  {
    const params = { categoryId: categoryId }
    this.router.navigate(["category-details"], { queryParams: params  })
  }

  onResize(event: any) 
  {
    this.colsNumberPerLine = event.target.innerWidth <= 767 ? 1 : 4;
  }

}
