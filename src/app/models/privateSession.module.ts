import {User} from "./User";

export class PrivateSessionModule
{
  privateSessionId!: number
  privateSessionTitle!: string
  privateSessionStartDateTime!: string
  privateSessionEndDateTime!: string
  privateSessionMember!: User
  privateSessionCoach!: User
}
