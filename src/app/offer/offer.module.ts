import {ActivityModule} from "../models/activity.module";

export class OfferModule
{
  offerId!: number
  offerTitle!: string
  offerPeriod!: number
  offerPrice!: number
  offerActivity!: ActivityModule
}
