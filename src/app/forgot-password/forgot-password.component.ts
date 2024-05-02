import { Component } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../services/user.service";
import {UtilsService} from "../utils/utils.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  isPasswordVisible = false
  isSendingEmailOperation = true
  isSendingCodeOperation = false
  isSendingPasswordOperation = false

  constructor(private userService: UserService, private utils: UtilsService, private matDialog: MatDialogRef<ForgotPasswordComponent>) {
  }

  sendVerificationCode(loginForm: NgForm)
  {
      this.userService.sendVerificationCode(loginForm.value.email).subscribe(
        {
        next: () => {
          this.utils.successDialog("Opération réussite", "Un e-mail contenant votre code de vérification a été envoyé avec succès!", true)
          this.isSendingEmailOperation = false
          this.isSendingCodeOperation = true
        },
          error: (err) => this.utils.successDialog("Erreur lors de l’envoi du courriel", err.message, false)
        })
  }

  checkVerificationCode(loginForm: NgForm)
  {
    this.userService.checkVerificationCode(loginForm.value.code).subscribe(
      {
        next: () => {
          this.utils.successDialog("Code est valide", "Veuillez saisir votre nouveau mot de passe !", true)
          this.isSendingCodeOperation = false
          this.isSendingPasswordOperation = true
        },
        error: (err) => {
          if (err.status == 404)
          {
            this.utils.successDialog("Echec de l'opération !!", "Code incorrect ou invalide vérifier votre code dans votre boite de réception!", false)
          }
        }
      })
  }

  changePassword(loginForm: NgForm)
  {
    this.userService.changePassword(loginForm.value.email, loginForm.value.password).subscribe(
      {
        next: () => {
          this.utils.successDialog("Opération réussite", "Votre mot de passe a été changer avec succès !", true)
          this.matDialog.close()
        },
        error: (err) => {
          if (err.status == 404)
          {
            this.utils.successDialog("Echec de l'opération !!", "User not found!", false)
          }
        }
      })
  }

  togglePasswordVisibility()
  {
    const showPass = document.getElementById("showPass") as HTMLInputElement

    console.log(showPass.checked)

    if (showPass)
    {
      this.isPasswordVisible = showPass.checked
    }
  }
}
