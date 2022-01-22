import { ApplicationRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginAppComponent } from 'projects/login/src/app/app.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private appRef: ApplicationRef,
    private router: Router,
  ) {
    this.router.events.subscribe((e) => {
      if(e instanceof NavigationEnd) {
        this.handleRoutingEnded(e);
      }
    })
  }

  private handleRoutingEnded(e: NavigationEnd) {
    if(e.urlAfterRedirects.includes('login')) {
      import('projects/login/src/app/app.component')
        .then((m) => {
          this.appRef.bootstrap(m.LoginAppComponent, '#content');
        })
    } else if (e.urlAfterRedirects.includes('recipes')) {
      import('projects/recipes/src/app/app.component')
        .then((m) => {
          this.appRef.bootstrap(m.RecipeAppComponent, '#content');
        })
    }
  }
}
