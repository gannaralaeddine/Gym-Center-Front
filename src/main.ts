import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./app/app.routes";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarModule, CalendarUtils, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers:[
    importProvidersFrom(HttpClientModule, FullCalendarModule, BrowserModule, BrowserAnimationsModule, CalendarUtils,
        CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory})),
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync(),
    // AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // AuthService
  ]
})
  .catch((err) => console.error(err))
