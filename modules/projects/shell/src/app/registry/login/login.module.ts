import { CommonModule } from '@angular/common';
import { ApplicationRef, NgModule } from '@angular/core';
import { LoginAppComponent } from 'projects/login/src/app/app.component';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  bootstrap: [],
})
export class LoginModule {
  ngDoBootstrap(ref: ApplicationRef) {
    ref.bootstrap(LoginAppComponent, '#content');
  }
}
