import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [
    CommonModule, FormsModule, InputTextModule, InputNumberModule,
    CheckboxModule, ButtonModule, DropdownModule, ToastModule, CardModule
  ],
  templateUrl: './pokemon-edit.component.html',
  providers: [MessageService]
})
export class PokemonEditComponent implements OnInit {
  pokemon: Pokemon | undefined;

  tipos = [
    { label: 'Água', value: 'Água' }, { label: 'Dragão', value: 'Dragão' },
    { label: 'Elétrico', value: 'Elétrico' }, { label: 'Fada', value: 'Fada' },
    { label: 'Fantasma', value: 'Fantasma' }, { label: 'Fogo', value: 'Fogo' },
    { label: 'Gelo', value: 'Gelo' }, { label: 'Grama', value: 'Grama' },
    { label: 'Inseto', value: 'Inseto' }, { label: 'Lutador', value: 'Lutador' },
    { label: 'Normal', value: 'Normal' }, { label: 'Pedra', value: 'Pedra' },
    { label: 'Psíquico', value: 'Psíquico' }, { label: 'Terra', value: 'Terra' },
    { label: 'Veneno', value: 'Veneno' }
  ];

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemonService.buscarPorId(id!).subscribe({
      next: (data) => this.pokemon = data,
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar o Pokémon.' });
        console.error(err);
      }
    });
  }

  salvar() {
    this.pokemonService.atualizar(this.pokemon!).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pokémon atualizado!' });
        this.router.navigate(['/lista']);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar o Pokémon.' });
        console.error(err);
      }
    });
  }
}