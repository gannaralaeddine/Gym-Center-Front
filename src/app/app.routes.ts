import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";
import {SubscriptionComponent} from "./subscription/subscription.component";

export const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'pricing', component: SubscriptionComponent},

];
