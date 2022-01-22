import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recipes',
    loadChildren: () =>
      import('./registry/recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./registry/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
