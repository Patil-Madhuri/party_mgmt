import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { PartyService } from './services/party.service';
import { AppMaterialModule } from './app-material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { PartyListComponent } from './component/party-list/party-list.component';
import { CreatePartyComponent } from './component/create-party/create-party.component';
import { DatePipe } from '@angular/common';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PartyListComponent,
    CreatePartyComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
