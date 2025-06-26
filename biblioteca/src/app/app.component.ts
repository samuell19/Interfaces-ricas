import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Pokédex Angular</h1>
    <nav>
      <a routerLink="/lista">Lista</a> |
      <a routerLink="/novo">Adicionar Pokémon</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
