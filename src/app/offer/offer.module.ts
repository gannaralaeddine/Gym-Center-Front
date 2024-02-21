import {ActivityModule} from "../models/activity.module";
import {OptionModule} from "../models/option.module";

export class OfferModule
{
  offerId!: number
  offerTitle!: string
  offerPeriod!: number
  offerPrice!: number
  offerActivity!: ActivityModule
  offerOption!: OptionModule[]
}
