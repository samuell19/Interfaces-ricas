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
import { PokemonDeleteComponent } from '../pokemon-delete/pokemon-delete.component';
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

  // ✅ Forma Correta
  carregarPokemons() {
    this.pokemonService.listar().subscribe({
      // 'next' é executado quando os dados chegam com sucesso
      next: (data) => {
        this.pokemons = data;
        console.log('Pokémons carregados!', this.pokemons);
      },
      // 'error' é executado se ocorrer um erro na requisição
      error: (err) => {
        console.error('Erro ao carregar os Pokémons:', err);
      }
    });
  }

  remover = (id: number) => {
    this.carregarPokemons();
  };
}
