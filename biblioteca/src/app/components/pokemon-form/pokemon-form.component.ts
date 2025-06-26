import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
export class PokemonFormComponent implements OnInit {
  pokemon: Pokemon = {
    id: 0,
    nome: '',
    numero_pokedex: 0,
    tipo: '',
    capturado: false
  };

  tipos = [
    { name: 'Água', value: 'Água' },
    { name: 'Dragão', value: 'Dragão' },
    { name: 'Elétrico', value: 'Elétrico' },
    { name: 'Fada', value: 'Fada' },
    { name: 'Fantasma', value: 'Fantasma' },
    { name: 'Fogo', value: 'Fogo' },
    { name: 'Gelo', value: 'Gelo' },
    { name: 'Grama', value: 'Grama' },
    { name: 'Inseto', value: 'Inseto' },
    { name: 'Lutador', value: 'Lutador' },
    { name: 'Normal', value: 'Normal' },
    { name: 'Pedra', value: 'Pedra' },
    { name: 'Psíquico', value: 'Psíquico' },
    { name: 'Terra', value: 'Terra' },
    { name: 'Veneno', value: 'Veneno' }
  ];

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const encontrado = this.pokemonService.buscarPorId(id);
      if (encontrado) {
        this.pokemon = { ...encontrado };
      }
    }
  }

  salvar() {
  if (this.pokemon.id === 0) {
    this.pokemonService.adicionar(this.pokemon);
  } else {
    this.pokemonService.atualizar(this.pokemon);
  }
  this.router.navigate(['/lista']);
}
}