import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "../utils/utils.service";
import {User} from "../models/User";
import {SessionModule} from "../session/session.module";

@Injectable({
  providedIn: 'root'
})

export class UserService
{

  constructor(private http: HttpClient, private utils: UtilsService) { }

  public getUserById(id:any)  { return this.http.get<User>(this.utils.API_GYM_CENTER + "/user/retrieve-user/"+id) }

  public getMemberByEmail(email: any)  { return this.http.get<User>(this.utils.API_GYM_CENTER + "/member/retrieve-member/" + email) }

  public getCoachByEmail(email: any)  { return this.http.get<User>(this.utils.API_GYM_CENTER + "/coach/retrieve-coach-by-email/" + email) }

  public retrieveMemberSessions(email: any)  { return this.http.get<SessionModule>(this.utils.API_GYM_CENTER + "/member/retrieve-member-sessions/" + email) }

  public retrieveCoachSessions(email: any)  { return this.http.get<SessionModule>(this.utils.API_GYM_CENTER + "/coach/retrieve-coach-sessions/" + email) }

  public getAllCoaches() {return this.http.get(this.utils.API_GYM_CENTER + "/coach/retrieve-all-coaches")}

  public retrieveUserByEmail(email: any)  { return this.http.get(this.utils.API_GYM_CENTER + "/user/retrieve-user-by-email/"+ email) }

  public updateProfilePicture(user: FormData) { return this.http.put(this.utils.API_GYM_CENTER + "/user/update-profile-picture", user) }

  public addImagesToUserProfile(formData: FormData) { return this.http.put(this.utils.API_GYM_CENTER + "/user/add-images-to-user", formData ) }

  public updateUserData(user: User) { return this.http.put(this.utils.API_GYM_CENTER + "/user/update-user", user) }

  public deleteUserImage(userId: number, imageName: string){ return this.http.delete(this.utils.API_GYM_CENTER + "/user/delete-user-image/" + userId + "/" + imageName) }

  public retrieveCoachSpecialities(id: number) {return this.http.get(this.utils.API_GYM_CENTER + "/coach/retrieve-coach-specialities/"+ id)}

}
