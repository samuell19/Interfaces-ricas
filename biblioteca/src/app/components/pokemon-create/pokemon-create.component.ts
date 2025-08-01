import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-pokemon-create',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, InputTextModule, InputNumberModule,
    CheckboxModule, ButtonModule, DropdownModule, ToastModule, CardModule
  ],
  templateUrl: './pokemon-create.component.html',
  providers: [MessageService]
})
export class PokemonCreateComponent {
  pokemonForm: FormGroup;

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
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.pokemonForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      numero_pokedex: [0, [Validators.required, Validators.min(1)]],
      tipo: ['', Validators.required],
      capturado: [false],
      foto: ['', Validators.required]
    });
  }

  salvar() {
    if (this.pokemonForm.valid) {
      const pokemon: Omit<Pokemon, 'id'> = this.pokemonForm.value;
      this.pokemonService.adicionar(pokemon).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pokémon criado!' });
          this.router.navigate(['/lista']);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao criar o Pokémon.' });
          console.error(err);
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Por favor, preencha todos os campos obrigatórios.' });
    }
  }
}