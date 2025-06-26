import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, CheckboxModule, ButtonModule],
  templateUrl: './pokemon-form.component.html'
})
export class PokemonFormComponent {
  pokemon: Pokemon = {
    id: 0,
    nome: '',
    tipo: '',
    capturado: false
  };

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
