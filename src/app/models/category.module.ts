import {FileHandleModule} from "./file-handle.module";

export class CategoryModule
{
  catId!:number
  catName!: string
  catDescription!: string
  catImage!: string
  catImages!: FileHandleModule[]
  categoryActivities!: []
}
