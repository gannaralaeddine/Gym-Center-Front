import {User} from "../models/User";
import {FileHandleModule} from "../models/file-handle.module";
import {ActivityModule} from "../models/activity.module";

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
