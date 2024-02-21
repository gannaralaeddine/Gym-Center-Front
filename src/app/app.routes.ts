import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SessionComponent } from "./session/session.component";
import { SubscriptionComponent } from "./subscription/subscription.component";
import { OfferComponent } from "./offer/offer.component";
import { CoachesComponent } from "./coaches/coaches.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { CategoriesComponent } from './categories/categories.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';
import { ActivityDetailsComponent } from './activities/activity-details/activity-details.component';
import { ProfilePopupComponent } from './profile-popup/profile-popup.component';

export const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile-popup', component: ProfilePopupComponent},
  {path: 'sessions', component: SessionComponent},
  {path: 'subscription', component: SubscriptionComponent},
  {path: 'offers', component: OfferComponent},
  {path: 'coaches', component: CoachesComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'category-details', component: CategoryDetailsComponent},
  {path: 'activities', component: ActivitiesComponent},
  {path: 'activity-details', component: ActivityDetailsComponent},
  {path: 'coach-profile', component: ProfilePopupComponent}
];
