import {Component} from '@angular/core';
import {UtilsService} from "../utils/utils.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {DatePipe, NgForOf} from "@angular/common";
import {SessionService} from "../services/session.service";
import {Router} from "@angular/router";
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import  interactionPlugin  from '@fullcalendar/interaction';
import {MatDialog} from "@angular/material/dialog";
import {SessionDetailsComponent} from "./session-details/session-details.component";
import {CalendarModule, CalendarWeekModule} from "angular-calendar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import timeGridPlugin from "@fullcalendar/timegrid";


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgForOf,
    DatePipe,
    FullCalendarModule,
    CalendarWeekModule,
    CalendarModule,
    MatDatepickerModule
  ],
  providers: [MatDatepickerModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent
{
    sessions: any

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

    constructor(private sessionService: SessionService, private utilsService: UtilsService, private router: Router,
                private dialogRef: MatDialog)
    {
      this.getAllSessions()
    }


    calendarEvents()
    {
        if (this.sessions)
        {
          let events: any = []

          this.sessions.forEach( (session:any) => {
                events.push( { id: session.sessionId, title: session.sessionName, date: session.sessionDeadline,
                  backgroundColor: this.generateRandomColor(), className: "fc-event-style"
                  } )
          })

          this.calendarOptions = {
            events: events
          };
        }
    }

    eventClick(args: any)
    {
      this.dialogRef.open(SessionDetailsComponent, {
        width: "70%",
        height: "80%",
        enterAnimationDuration: "1000ms",
        exitAnimationDuration: "1000ms",
        data: { sessionId: args.event.id }
      })
    }

    generateRandomColor(): string {
      const letters = '0123456789ABCDEF';
      let color = '#';

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    }


    getAllSessions()
    {
      this.sessionService.getAllSessions().subscribe({
        next: (sessions) => { this.sessions = sessions; this.calendarEvents() },
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
        return "../assets/img/icons/ic_person.svg"
      }
    }
}
