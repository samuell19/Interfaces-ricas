import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonCreateComponent } from './components/pokemon-create/pokemon-create.component';
import { PokemonEditComponent } from './components/pokemon-edit/pokemon-edit.component';
import { PokemonLoginComponent } from './components/pokemon-login/pokemon-login.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'login', component: PokemonLoginComponent, title: 'Login' },
  { path: 'lista', component: PokemonListComponent, title: 'Pokédex',canActivate: [authGuard]},
  { path: 'novo', component: PokemonCreateComponent, title: 'Novo Pokémon',canActivate: [authGuard] },
  { path: 'editar/:id', component: PokemonEditComponent, title: 'Editar Pokémon',canActivate: [authGuard] },
  { path: '**', redirectTo: 'lista' }
  
];