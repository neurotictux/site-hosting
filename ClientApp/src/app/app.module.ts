import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material'
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'


import { AppComponent, ErrorModal } from './app.component';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NewUserModalComponent,
    ErrorModal
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
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewUserModalComponent, ErrorModal]
})
export class AppModule { }