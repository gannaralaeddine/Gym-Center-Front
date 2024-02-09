import { Injectable } from '@angular/core';
import {UtilsService} from "../utils/utils.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OfferService
{

  constructor(private http: HttpClient, private utils: UtilsService) { }

  public getAllOffers() {return this.http.get(this.utils.API_GYM_CENTER + "/offer/retrieve-all-offers")}

}
