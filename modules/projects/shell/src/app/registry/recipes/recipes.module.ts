import { ApplicationRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeAppComponent as RecipesAppComponent } from 'projects/recipes/src/app/app.component';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class RecipesModule {
  ngDoBootstrap(ref: ApplicationRef) {
    ref.bootstrap(RecipesAppComponent);
  }
}
