import { Component, Inject, TemplateRef } from '@angular/core'
import { UserService } from '../services/user.service'
import { Globals, User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class LoginComponent {
  user: User = <User>{}
  message = ''
  constructor(private service: UserService, private router: Router) {
    const user = Globals.getUser()
    if (user != null)
      this.router.navigate(['data-access'])
  }

  login() {
    this.service.getToken(this.user).subscribe(res => {
      if ((<any>res).message) {
        this.message = (<any>res).message
      } else {
        Globals.setUser(<User>res)
        location.reload()
      }
    })
  }
}