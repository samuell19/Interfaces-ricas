import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonCreateComponent } from './components/pokemon-create/pokemon-create.component';
import { PokemonEditComponent } from './components/pokemon-edit/pokemon-edit.component';


export const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: PokemonListComponent, title: 'Pokédex' },
  { path: 'novo', component: PokemonCreateComponent, title: 'Novo Pokémon' },
  { path: 'editar/:id', component: PokemonEditComponent, title: 'Editar Pokémon' },
  { path: '**', redirectTo: 'lista' }
];