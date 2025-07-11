import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PokemonDeleteComponent } from '../pokemon-delete/pokemon-delete.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    PokemonDeleteComponent,
    ToastModule,
    ConfirmDialogModule 
  ],
  templateUrl: './pokemon-list.component.html',
  providers: [ConfirmationService, MessageService]
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  constructor(
    private pokemonService: PokemonService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.carregarPokemons();
  }
  carregarPokemons() {
    this.pokemonService.listar().subscribe({
      next: (data) => {
        this.pokemons = data;
      },
      error: (err) => {
        console.error('Erro ao carregar os Pokémons:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar a lista de Pokémons.' });
      }
    });
  }

  remover(id: number | string) {
    this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== id);
  }
}