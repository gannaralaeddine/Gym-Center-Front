import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm} from "@angular/forms";
import {UtilsService} from "../utils/utils.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent
{

  isPasswordVisible = false

  constructor(private authService: AuthService, private router: Router, private utils: UtilsService) {  }

  login(loginForm: NgForm)
  {
    this.authService.login(loginForm.value).subscribe({
      next: (response: any)  => {

        if ( response.authorities[0].authority === "ROLE_MEMBER" )
        {
          console.log("You are connected as member !!!")

          this.authService.setRolesLS(response.authorities)
          this.authService.setTokenLS(response.token)
          this.authService.setEmailLS(response.email)

          this.router.navigate([""]).then(() => window.location.reload())
        }
        else
        {

          this.utils.successDialog("Échec de connexion", "Vous n'avez pas les droit d'accès", false)
        }

      },
      error: (err: any)  => {
        if (err.status == 401)
        {
          this.utils.successDialog("Échec de connexion", "Vérifier vos informations d'identification", false)
        }
        else
        {
          this.utils.successDialog("error is not 401", "error is not 401", false)
        }

      }

    })
  }

  togglePasswordVisibility()
  {
    const showPassword = document.getElementById("showPassword") as HTMLInputElement

    if (showPassword)
    {
      this.isPasswordVisible = showPassword.checked
    }
  }



}
