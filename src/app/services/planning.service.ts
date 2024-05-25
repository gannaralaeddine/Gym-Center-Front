import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "../utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private http: HttpClient, private utils: UtilsService) { }

  public addPrivateSession(privateSession: any) { return this.http.post(this.utils.API_GYM_CENTER + "/private-session/add-private-session", privateSession ) }

  public retrieveAvailablePrivateSessions() { return this.http.get<any>(this.utils.API_GYM_CENTER + "/private-session/retrieve-all-private-sessions") }

  public retrievePrivateSession(id: any) { return this.http.get<any>(this.utils.API_GYM_CENTER + "/private-session/retrieve-private-session/" + id) }

  public cancelPrivateSession(memberEmail: string, privateSessionId: number) { return this.http.put(this.utils.API_GYM_CENTER + "/private-session/cancelPrivateSession/" + memberEmail + "/" + privateSessionId, memberEmail ) }

}
