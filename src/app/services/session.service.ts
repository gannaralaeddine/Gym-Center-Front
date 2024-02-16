import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "../utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService
{

  constructor(private http: HttpClient, private utils: UtilsService) { }

  public getAllSessions() { return this.http.get<any>(this.utils.API_GYM_CENTER + "/session/retrieve-all-sessions") }

  public getSession(id: any) { return this.http.get<any>(this.utils.API_GYM_CENTER + "/session/retrieve-session/" + id) }

  public assignMemberToSession(email: string, sessionId: number) { return this.http.put(this.utils.API_GYM_CENTER + "/session/assign-member-to-session/" + email + "/" + sessionId, email ) }

}
