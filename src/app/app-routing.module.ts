import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'character', loadComponent: () => import('./pages/character-list/character-list.component').then((c) => c.CharacterListComponent) },
  { path: 'character/:id', loadComponent: () => import('./pages/character-detail/character-detail.component').then((c) => c.CharacterDetailComponent) },
  { path: '', redirectTo: '/character', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
