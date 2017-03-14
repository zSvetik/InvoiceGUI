import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard.component';
import {RoomsComponent} from './rooms.component';
import {RoomDetailComponent} from './room-detail.component';
import {RoomInfoService} from './RoomInfo.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RoomDetailComponent,
    RoomsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    RouterModule,
    LocalStorageModule.withConfig({
      prefix: 'invoice-app',
      storageType: 'localStorage'
    })
  ],
  providers: [RoomInfoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
