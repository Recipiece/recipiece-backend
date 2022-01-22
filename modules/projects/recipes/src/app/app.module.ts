import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RecipeAppComponent } from './app.component';

@NgModule({
  declarations: [
    RecipeAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [RecipeAppComponent]
})
export class AppModule { }
