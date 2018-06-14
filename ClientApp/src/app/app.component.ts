import { Component, Inject, TemplateRef } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'error-modal',
  template: '<span style="color:red;font-size:30px">X</span> {{error}}!'
})
export class ErrorModal {
  error: string = '';

  constructor(
    public dialogRef: MatDialogRef<ErrorModal>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.error = data.message  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayedColumns = ['userId', 'name', 'email', 'admin', 'actions'];
  dataSource = null;

  constructor(public dialog: MatDialog, private service: UserService) {
    this.refresh()
    this.showError('Teste do erro!')
  }

  refresh() {
    this.service.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource(<[any]>res);
    }, err => console.error(err))
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openModal(user): void {
    let dialogRef = this.dialog.open(NewUserModalComponent, {
      data: { user: { ...user } }
    });

    dialogRef.afterClosed().subscribe(user => {
      if (user)
        this.saveUser(user)
    });
  }

  showError(message: string) {
    this.dialog.open(ErrorModal, {
      data: { message: message }
    })
  }

  saveUser(user) {
    this.service.saveUser(user).subscribe(res => { this.refresh() })
  }

  removeUser(user) {
    this.service.removeUser(user.userId).subscribe(res => { this.refresh() })
  }
}