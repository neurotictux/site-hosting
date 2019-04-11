import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatCardModule } from '@angular/material'
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'


import { AppComponent, RemoveModalComponent } from './app.component';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';
import { FormsModule } from '@angular/forms';
import { UserAccountComponent } from './user-account/user-account.component';
import { DataAccessComponent } from './data-access/data-access.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user-login/user-login.component';

const appRoutes: Routes = [
  { path: 'data-access', component: DataAccessComponent },
  { path: 'account', component: UserAccountComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NewUserModalComponent,
    RemoveModalComponent,
    UserAccountComponent,
    DataAccessComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewUserModalComponent, RemoveModalComponent]
})
export class AppModule { }