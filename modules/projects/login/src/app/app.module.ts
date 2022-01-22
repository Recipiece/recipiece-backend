import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginAppComponent } from './app.component';

@NgModule({
  declarations: [
    LoginAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [LoginAppComponent]
})
export class AppModule { }
