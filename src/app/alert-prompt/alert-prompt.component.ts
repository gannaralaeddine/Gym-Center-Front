import {Component, Inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-alert-delete',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './alert-prompt.component.html',
  styleUrl: './alert-prompt.component.css'
})
export class AlertPromptComponent
{

  operationType = ""
  title = ""
  message = ""

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AlertPromptComponent>) {
    this.operationType = data.operationType
    this.title = data.title
    this.message = data.message
  }

  closeDialog(isYesOperation: boolean)
  {
    this.dialogRef.close(isYesOperation)
  }
}
