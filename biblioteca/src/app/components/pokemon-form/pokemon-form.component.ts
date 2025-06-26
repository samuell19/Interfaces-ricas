import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './pokemon-form.component.html'
})
export class PokemonFormComponent {
  pokemon: Pokemon = {
    id: 0,
    nome: '',
    tipo: '',
    capturado: false
  };

  tipos = [
    { name: 'Fogo', value: 'Fogo' },
    { name: 'Água', value: 'Água' },
    { name: 'Grama', value: 'Grama' },
    { name: 'Elétrico', value: 'Elétrico' },
    { name: 'Pedra', value: 'Pedra' },
    { name: 'Fantasma', value: 'Fantasma' },
  ];

  constructor(private pokemonService: PokemonService) {}

  salvar() {
    if (this.pokemon.id === 0) {
      this.pokemonService.adicionar(this.pokemon);
    } else {
      this.pokemonService.atualizar(this.pokemon);
    }
    this.pokemon = { id: 0, nome: '', tipo: '', capturado: false };
  }
}
