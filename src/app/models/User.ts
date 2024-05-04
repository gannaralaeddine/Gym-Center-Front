import {FileHandleModule} from "./file-handle.module";
import {Role} from "./role.module";
import {SessionModule} from "../session/session.module";

export class User
{
  userId?: number
  userEmail?: string
  userFirstName!: string
  userLastName!: string
  userBirthDate? : Date
  userPhoneNumber? : string
  userDescription?: string
  userGender? : string
  userHeight? : string
  userWeight? : string
  userPicture? : string
  userCountry? : string
  userState? : string
  userCity? : string
  userZipCode? : string
  userPassword? : string
  roles?: Array<Role>
  userImages!: FileHandleModule[]
  userIsEnabled!: boolean
  userSpeciality?: string
  memberSessions!: SessionModule[]
  memberCoaches!: User[]
  coachMembers!: User[]
}
