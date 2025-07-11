import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: PokemonListComponent, title: 'Pokédex' },
  { path: 'novo', component: PokemonFormComponent, title: 'Novo Pokémon' },
  { path: 'editar/:id', component: PokemonFormComponent, title: 'Editar Pokémon' },
  { path: '**', redirectTo: 'lista' } // Rota coringa para qualquer URL não encontrada
];