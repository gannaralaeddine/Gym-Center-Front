import { Component } from '@angular/core';
import {EmailModule} from "../models/EmailModule";
import {UserService} from "../services/user.service";
import {UtilsService} from "../utils/utils.service";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent
{
    email = new EmailModule()

  constructor(private userService: UserService, private utilsService: UtilsService) {
  }

  sendContactUsEmail()
  {
      this.userService.sendContactUsEmail(this.email).subscribe({
          next: () => this.utilsService.successDialog("Opération réussite", "votre email a été envoyer avec succès", true),
          error: (err) => this.utilsService.successDialog("Opération échouée", err.message(), true)
      })
  }
}
