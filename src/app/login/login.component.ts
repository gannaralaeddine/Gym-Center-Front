import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm} from "@angular/forms";
import {UtilsService} from "../utils/utils.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";

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
  isEnabled = false
  isPasswordVisible = false

  constructor(private authService: AuthService, private router: Router, private utils: UtilsService, private userService: UserService, private dialog: MatDialog) {  }

  login(loginForm: NgForm)
  {
    this.authService.login(loginForm.value).subscribe({
      next: (response: any)  => {

        this.userService.retrieveUserByEmail(response.email).subscribe(
          {
            next: (val) => {
              const user = val as User
              this.isEnabled = user.userIsEnabled

              if (!user.userIsEnabled) {
                this.utils.successDialog("Échec de connexion", "Vous devez valider votre compte en cliquant sur le lien envoyé par mail !", false)
              }
              else if ( response.authorities[0].authority === "ROLE_MEMBER" || response.authorities[0].authority === "ROLE_COACH" )
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


            }
          })

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


  forgotPassword()
  {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width= "40%"
      dialogConfig.height = "70%"
      this.dialog.open(ForgotPasswordComponent, dialogConfig)
  }

}
