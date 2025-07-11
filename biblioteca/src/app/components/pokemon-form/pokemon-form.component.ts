import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    ButtonModule,
    DropdownModule,
    ToastModule,
    CardModule
  ],
  templateUrl: './pokemon-form.component.html',
  providers: [MessageService]
})
export class PokemonFormComponent implements OnInit {
  pokemon: Omit<Pokemon, 'id'> & { id?: number | string } = {
    nome: '',
    numero_pokedex: 0,
    tipo: '',
    capturado: false
  };
  isEditMode = false;
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
    if (id) {
      this.isEditMode = true;
      this.pokemonService.buscarPorId(id).subscribe({
        next: (data) => this.pokemon = data,
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar o Pokémon.' });
          console.error(err);
        }
      });
    }
  }

  salvar() {
    const operation = this.isEditMode
      ? this.pokemonService.atualizar(this.pokemon as Pokemon)
      : this.pokemonService.adicionar(this.pokemon);

    operation.subscribe({
      next: () => {
        const detail = this.isEditMode ? 'Pokémon atualizado com sucesso!' : 'Pokémon criado com sucesso!';
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail });
        this.router.navigate(['/lista']);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar o Pokémon.' });
        console.error(err);
      }
    });
  }
}