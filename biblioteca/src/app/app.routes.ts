import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: PokemonListComponent },
  { path: 'novo', component: PokemonFormComponent },
  { path: 'editar/:id', component: PokemonFormComponent }
];
