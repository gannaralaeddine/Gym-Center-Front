import {FileHandleModule} from "./file-handle.module";
import {CategoryModule} from "./category.module";
import {User} from "./User";

export class ActivityModule
{
  actId!: number
  actName!: string
  actDescription!: string
  actImage!: string
  category!: CategoryModule
  actImages!: FileHandleModule[]
  actCoaches!: User[]

}
