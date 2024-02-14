import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";
import {SubscriptionComponent} from "./subscription/subscription.component";
import {OfferComponent} from "./offer/offer.component";
import {CoachesComponent} from "./coaches/coaches.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import { CategoriesComponent } from './categories/categories.component';
import { ActivitiesComponent } from './activities/activities.component';

export const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'sessions', component: CoursesComponent},
  {path: 'subscription', component: SubscriptionComponent},
  {path: 'offers', component: OfferComponent},
  {path: 'coaches', component: CoachesComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'activities', component: ActivitiesComponent}
];
