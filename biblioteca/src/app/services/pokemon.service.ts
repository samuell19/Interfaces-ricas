import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemons: Pokemon[] = [
    { id: 1, nome: 'Bulbasaur', tipo: 'Grama', capturado: true },
    { id: 2, nome: 'Charmander', tipo: 'Fogo', capturado: false },
  ];
  private nextId = 3;

  listar(): Pokemon[] {
    return [...this.pokemons];
  }

  adicionar(pokemon: Pokemon): void {
    pokemon.id = this.nextId++;
    this.pokemons.push(pokemon);
  }

  atualizar(pokemon: Pokemon): void {
    const index = this.pokemons.findIndex(p => p.id === pokemon.id);
    if (index !== -1) this.pokemons[index] = pokemon;
  }

  remover(id: number): void {
    this.pokemons = this.pokemons.filter(p => p.id !== id);
  }

  buscarPorId(id: number): Pokemon | undefined {
    return this.pokemons.find(p => p.id === id);
  }
}
