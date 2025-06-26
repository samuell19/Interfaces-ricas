import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenubarModule],
  template: `
    <div class="header">
      <h1>
        Pokédex Angular
        <img class="pokeball" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png" alt="Pokebola">
      </h1>
    </div>
    <p-menubar [model]="items" class="custom-menubar"></p-menubar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = [
    {
      label: 'Lista',
      icon: 'pi pi-list',
      routerLink: '/lista'
    },
    {
      label: 'Adicionar Pokémon',
      icon: 'pi pi-plus',
      routerLink: '/novo'
    }
  ];
}