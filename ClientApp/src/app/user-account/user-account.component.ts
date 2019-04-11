import { Component, Inject, TemplateRef } from '@angular/core'
import { UserService } from '../services/user.service'
import { Router } from '@angular/router';
import { Globals, User } from '../models/user';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {
  user: User = <User>{}
  message: string
  constructor(private service: UserService, private router: Router) {
    const user = Globals.getUser()
    if (user != null)
      this.router.navigate(['data-access'])
  }

  createUser() {
    console.log(this.user)
    this.service.createUser(this.user).subscribe(res => {
      if ((<any>res).message) {
        this.message = (<any>res).message
      } else {
        Globals.setUser(<User>res)
        location.reload()
      }
    })
  }
}