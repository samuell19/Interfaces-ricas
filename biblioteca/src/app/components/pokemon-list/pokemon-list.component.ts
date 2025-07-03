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
import { PokemonDeleteComponent } from '../pokemon-delete/pokemon-delete.component'; // import do componente novo

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    RouterModule,
    ConfirmDialogModule,
    PokemonDeleteComponent // inclusão correta aqui
  ],
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

  remover = (id: number) => {
    this.carregarPokemons();
  };
}
