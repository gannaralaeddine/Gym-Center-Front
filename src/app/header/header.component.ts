import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UtilsService} from "../utils/utils.service";
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {NotificationMemberCoachModule} from "../models/notificationMemberCoach.module";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit
{

  userIsLoggedIn = false
  user = new User()
  userNotifications!: NotificationMemberCoachModule[]

  constructor(private userService: UserService, private utilsService: UtilsService, @Inject(PLATFORM_ID) private platformId: Object,
              private authService: AuthService, private router: Router) {  }

  ngOnInit()
  {
      if (isPlatformBrowser(this.platformId))
      {

        if (this.isLoggedIn() && this.authService.getEmailLS())
        {
            this.userIsLoggedIn = true
            this.getUserByEmail(this.authService.getEmailLS() as string)
            this.getUserNotifications(this.authService.getEmailLS() as string, this.authService.getRolesLS()[0].authority)
        }
        else
        {
          this.userIsLoggedIn = false
        }
      }
  }

  isLoggedIn(): boolean
  {
    if (isPlatformBrowser(this.platformId))
    {
      return this.authService.isLoggedIn()
    }
    return false
  }


  getUserByEmail(email: string)
  {
    this.userService.retrieveUserByEmail(email).subscribe(
      {
        next: (user) => {
          this.user = user as User
        },
        error: (err) => console.error(err)
      }
    )
  }

  logout()
  {
    this.authService.clearLocalStorage()
    this.router.navigate([""]).then(() => window.location.reload())
  }

  getImage(userPicture: any)
  {
    if (userPicture)
    {
      return this.utilsService.getImage(userPicture)
    }
    else
    {
      return "../assets/img/icons/ic_person.svg"
    }
  }

  getUserNotifications(userEmail: string, userRole: string)
  {
      if (userRole === "ROLE_MEMBER")
      {
          this.userService.getMemberNotifications(userEmail).subscribe({
            next: (memberNotifications) => {
              this.userNotifications = memberNotifications
            },
            error: (err) => console.log(err.message)
          })
      }

      if (userRole === "ROLE_COACH") {
          this.userService.getCoachNotifications(userEmail).subscribe({
            next: (coachNotifications) => {
              this.userNotifications = coachNotifications
            },
            error: (err) => console.log(err.message)
          })
      }
  }

  acceptInvitation()
  {

  }

  cancelInvitation()
  {

  }
}
