import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, RouterModule, ConfirmDialogModule],
  templateUrl: './pokemon-list.component.html',
  providers: [ConfirmationService]
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.carregarPokemons();
  }

  carregarPokemons() {
    this.pokemons = this.pokemonService.listar();
  }

  confirmarRemocao(pokemon: Pokemon) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o Pokémon ${pokemon.nome}?`,
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.remover(pokemon.id);
      }
    });
  }

  remover(id: number) {
    this.pokemonService.remover(id);
    this.carregarPokemons();
  }
}
