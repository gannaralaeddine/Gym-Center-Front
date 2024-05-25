import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "../utils/utils.service";
import {User} from "../models/User";
import {SessionModule} from "../session/session.module";
import {Observable} from "rxjs";

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

  public sendContactUsEmail(email: any): Observable<Object> { return this.http.post<object>(this.utils.API_GYM_CENTER + "/user/send-contact-us-email", email) }

  public sendVerificationCode(email: any): Observable<Object> { return this.http.post(this.utils.API_GYM_CENTER + "/user/send-verification-code/" + email, email) }

  public checkVerificationCode(code: any): Observable<Object> { return this.http.post<object>(this.utils.API_GYM_CENTER + "/user/check-verification-code/"+ code, code) }

  public changePassword(email: string, password: string) { return this.http.put(this.utils.API_GYM_CENTER + "/user/change-password/" + email + "/" + password, email) }

  public coachBooking(memberEmail: string, coachEmail: string) { return this.http.put(this.utils.API_GYM_CENTER + "/member/private-coach-booking/" + memberEmail + "/" + coachEmail, memberEmail ) }

  public retrieveMemberPrivateCoaches(memberEmail: any)  { return this.http.get<User>(this.utils.API_GYM_CENTER + "/member/retrieve-private-coaches/" + memberEmail) }

  public retrieveCoachPrivateMembers(coachEmail: any)  { return this.http.get<User>(this.utils.API_GYM_CENTER + "/coach/retrieve-private-members/" + coachEmail) }

  public isMyPrivateCoach(memberEmail: string, coachEmail: string) { return this.http.get<boolean>(this.utils.API_GYM_CENTER + "/member/is-my-private-coach/" + memberEmail + "/" + coachEmail ) }


  public terminateCoachMemberRelation(memberEmail: string, coachEmail: string) { return this.http.get<string>(this.utils.API_GYM_CENTER + "/coach/terminate-coach-member-relation/" + memberEmail + "/" + coachEmail ) }

  public getMemberNotifications(memberEmail: string) { return this.http.get<any>(this.utils.API_GYM_CENTER + "/member/getMemberNotifications/" + memberEmail ) }

  public getCoachNotifications(coachEmail: string) { return this.http.get<any>(this.utils.API_GYM_CENTER + "/coach/getCoachNotifications/" + coachEmail ) }

  public privateCoachBooking(memberEmail: string, privateSessionId: number) { return this.http.put(this.utils.API_GYM_CENTER + "/member/coach-booking/" + memberEmail + "/" + privateSessionId, memberEmail ) }

  public getCoachPrivateSessions(coachEmail: string) { return this.http.get<any>(this.utils.API_GYM_CENTER + "/coach/getCoachPrivateSessions/" + coachEmail ) }

  public getMemberPrivateSessions(memberEmail: string) { return this.http.get<any>(this.utils.API_GYM_CENTER + "/member/getMemberPrivateSessions/" + memberEmail ) }


}
