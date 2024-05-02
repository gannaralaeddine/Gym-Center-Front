import { Component, OnInit } from '@angular/core';
import {EmailModule} from "../models/EmailModule";
import {UserService} from "../services/user.service";
import {UtilsService} from "../utils/utils.service";
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    NgIf
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit
{
    email = new EmailModule()
    aboutUsFormValue !: FormGroup;

  constructor(
    private userService: UserService, 
    private utilsService: UtilsService,
    private aboutUsFormBuilder: FormBuilder) { }

    ngOnInit()
    {
      this.aboutUsFormValue = this.aboutUsFormBuilder.group({
        aboutUsMessage : ['',Validators.required],
        aboutUsFullName: ['',Validators.required],
        aboutUsEmailAddress: ['', Validators.required],
        aboutUsEmailSubject: ['',Validators.required]
      })
    }

  sendContactUsEmail()
  {
    this.email.subject = this.aboutUsFormValue.controls['aboutUsEmailSubject'].value
    this.email.senderName = this.aboutUsFormValue.controls['aboutUsFullName'].value
    this.email.senderEmail = this.aboutUsFormValue.controls['aboutUsEmailAddress'].value
    this.email.text = this.aboutUsFormValue.controls['aboutUsMessage'].value

    this.userService.sendContactUsEmail(this.email).subscribe({
      next: () => this.utilsService.successDialog("Opération réussite", "votre email a été envoyé avec succès", true),
      error: (err) => this.utilsService.successDialog("Opération échouée", err.message(), true)
    })
  }
}
