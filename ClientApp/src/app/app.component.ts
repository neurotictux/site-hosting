import { Component, Inject, TemplateRef } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { Globals } from './models/user';

@Component({
  selector: 'app-remove-modal',
  template: '<div style="text-align:center"><div>Deseja realmente excluir sua conta?</div>' +
    '<button mat-raised-button (click)="cancel()">Cancel</button>' +
    '<button mat-raised-button (click)="confirm()">Sim</button>'
})
export class RemoveModalComponent {
  confirm: Function

  constructor(private service: UserService,
    public dialogRef: MatDialogRef<RemoveModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.confirm = () => {
      this.removeUser()
      this.dialogRef.close()
    }
  }

  removeUser() {
    this.service.removeUser(Globals.getUser().id).subscribe(res => {
      Globals.setUser(null)
      location.reload()
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  cancel(): void {
    this.dialogRef.close()
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logged
  constructor(private router: Router) {
    const user = Globals.getUser()
    this.logged = user
    if (user == null)
      this.router.navigate([''])
    else
      this.router.navigate(['data-access'])

  }

  logout() {
    Globals.setUser(null)
    location.reload()
  }
}