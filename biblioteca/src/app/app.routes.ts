import { Routes } from '@angular/router';
// Remova o import do PokemonFormComponent
// import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
// Adicione os imports dos novos componentes
import { PokemonCreateComponent } from './components/pokemon-create/pokemon-create.component';
import { PokemonEditComponent } from './components/pokemon-edit/pokemon-edit.component';


export const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: PokemonListComponent, title: 'Pokédex' },

  // ✅ ROTAS ATUALIZADAS
  { path: 'novo', component: PokemonCreateComponent, title: 'Novo Pokémon' },
  { path: 'editar/:id', component: PokemonEditComponent, title: 'Editar Pokémon' },

  { path: '**', redirectTo: 'lista' }
];