import { Component, Inject, TemplateRef } from '@angular/core'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user = {}
  constructor(private service: UserService) {
    this.service.getAll().subscribe(res => {

    }, err => console.error(err))
  }

  saveUser() {
    console.log(this.user)
    // this.service.saveUser(user).subscribe(res => {  })
  }
}