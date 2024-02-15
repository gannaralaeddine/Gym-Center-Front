import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormsModule, NgForm} from "@angular/forms";

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
  
  togglePasswordVisibility()
  {
    const showPassword = document.getElementById("showPassword") as HTMLInputElement

    if (showPassword)
    {
      this.isPasswordVisible = showPassword.checked
    }
  }

  login(_t15: NgForm) 
  {
    
  }

}
