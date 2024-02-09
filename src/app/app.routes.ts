import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";
import {SubscriptionComponent} from "./subscription/subscription.component";
import {OfferComponent} from "./offer/offer.component";

export const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'subscription', component: SubscriptionComponent},
  {path: 'pricing', component: OfferComponent},


];
