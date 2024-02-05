import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService
{

  public API_GYM_CENTER = "http://localhost:8089/gym-center"

  constructor() { }


  public getImage(imageName: string): string { return this.API_GYM_CENTER + "/image/get-image/" + imageName }

}
