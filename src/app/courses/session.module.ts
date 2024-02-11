import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from "../models/User";
import {FileHandleModule} from "../models/file-handle.module";
import {ActivityModule} from "../models/activity.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SessionModule
{

  sessionId!: number
  sessionName!: string
  sessionDescription!: string
  sessionActivity!: ActivityModule
  sessionCoach!: User
  sessionImage!: string
  sessionTotalPlaces!: number
  sessionReservedPlaces!: number
  sessionDeadline!: string
  sessionMembers: any
  sessionImages!: FileHandleModule[]

}
