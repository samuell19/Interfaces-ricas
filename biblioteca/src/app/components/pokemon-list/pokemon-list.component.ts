import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule],
  templateUrl: './pokemon-list.component.html'
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.carregarPokemons();
  }

  carregarPokemons() {
    this.pokemons = this.pokemonService.listar();
  }

  remover(id: number) {
    this.pokemonService.remover(id);
    this.carregarPokemons();
  }
}
