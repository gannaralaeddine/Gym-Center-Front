import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {CommonModule, isPlatformBrowser, NgForOf} from "@angular/common";
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import {MatDialog} from "@angular/material/dialog";
import {AddPlanningComponent} from "./add-planning/add-planning.component";
import {AuthService} from "../auth/auth.service";
import {PlanningService} from "../services/planning.service";
import {PrivateSessionModule} from "../models/privateSession.module";
import {DetailsPlanningComponent} from "./details-planning/details-planning.component";
import {UserService} from "../services/user.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgForOf,
    FullCalendarModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent implements OnInit
{
  connectedUserEmail!: string
  accountType!: string
  privateSessions = [PrivateSessionModule]
  allPrivateSessions: any
  coaches: any

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    buttonText: {
      day: 'Jour',
      week: 'Semaine',
      month: 'Mois',
      today: "Aujourd'hui"
    },
    eventClick: this.eventClick.bind(this)
  } as CalendarOptions;

  constructor(private dialogRef: MatDialog, @Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService,
              private planningService: PlanningService, private userService: UserService) {
  }

  ngOnInit()
  {
    this.getAllCoaches()

    if (isPlatformBrowser(this.platformId))
    {
      this.connectedUserEmail = this.authService.getEmailLS() as string
      this.accountType = this.authService.getRolesLS()[0].authority
    }

    this.retrieveAvailablePrivateSessions()
  }

  eventClick(args: any)
  {
    this.dialogRef.open(DetailsPlanningComponent, {
      width: "30%",
      height: "40%",
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { id: args.event.id, title: args.event.title, start: args.event.start, end: args.event.end, coachEmail: this.connectedUserEmail }
    }).afterClosed().subscribe({
      next: () => this.retrieveAvailablePrivateSessions()
    })
  }

  addPrivateSession()
  {
    this.dialogRef.open(AddPlanningComponent, {
      width: "35%",
      height: "60%",
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
    }).afterClosed().subscribe(() =>{
      this.retrieveAvailablePrivateSessions()
    })
  }

  retrieveAvailablePrivateSessions()
  {
      this.planningService.retrieveAvailablePrivateSessions().subscribe({
        next: (privateSessions) => { this.allPrivateSessions = privateSessions; this.calendarEvents(privateSessions) },
        error: (err) => console.log(err.message)
      })
  }

  calendarEvents(privateSessions: any)
  {
    if (privateSessions)
    {
      let events: any = []

      privateSessions.forEach( (privateSession: PrivateSessionModule) => {
        events.push( { id: privateSession.privateSessionId, title: privateSession.privateSessionTitle + "(" + privateSession.privateSessionCoach.userFirstName + " " + privateSession.privateSessionCoach.userLastName + ")", start: privateSession.privateSessionStartDateTime, end: privateSession.privateSessionEndDateTime,
          backgroundColor: this.generateRandomColor(), className: "fc-event-style"
        } )
      })

      this.calendarOptions = {
        events: events
      };
    }
  }

  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  getAllCoaches()
  {
    this.userService.getAllCoaches().subscribe({
      next: (coaches) => this.coaches = coaches,
      error: (err) => console.error(err)
    })
  }

  filterByCoach()
  {
    if (document)
    {
        const coachSelect = document.getElementById("filterByCoachSelect") as HTMLSelectElement

        this.privateSessions = []

        if (coachSelect.value == "-1")
        {
          this.calendarEvents(this.allPrivateSessions)
        }
        else
        {
            // @ts-ignore
            this.allPrivateSessions.forEach(privateSession => {

              if (privateSession.privateSessionCoach.userId == coachSelect.value)
              {
                this.privateSessions.push(privateSession)
                console.log(privateSession.privateSessionCoach.userSpeciality)
                console.log(privateSession.privateSessionCoach.userId)
              }
            })
            this.calendarEvents(this.privateSessions)
        }
    }
  }
}
