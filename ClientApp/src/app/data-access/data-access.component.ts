import { Component, Inject, TemplateRef } from '@angular/core'
import { UserService } from '../services/user.service'
import { MatDialog } from '@angular/material';
import { RemoveModalComponent } from '../app.component';
import { Globals, User } from '../models/user';

@Component({
  selector: 'app-data-access',
  templateUrl: './data-access.component.html',
  styleUrls: ['./data-access.component.css']
})
export class DataAccessComponent {
  user: User
  ip: string
  link: string
  git: string
  constructor(private service: UserService, public dialog: MatDialog) {
    this.user = Globals.getUser()
    this.link = `${location.protocol}//${this.user.domain}`
    this.git = `${this.user.userAccess}@${location.host.split(':')[0]}:/mnt/apache/${this.user.userAccess}`
    setTimeout(() => {
      this.ip = location.host.split(':')[0]
    }, 200)
  }

  openModal() {
    const dialogRef = this.dialog.open(RemoveModalComponent, {
      width: '400px',
      data: { confirm: this.removeUser }
    });
  }

  removeUser() {
    this.service.removeUser(Globals.getUser().id).subscribe(res => {
      location.reload()
    })
  }
}