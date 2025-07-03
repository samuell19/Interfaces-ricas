import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemons: Pokemon[] = [
    { id: 1, nome: 'Bulbasaur', numero_pokedex: 1, tipo: 'Grama', capturado: true },
    { id: 2, nome: 'Ivysaur', numero_pokedex: 2, tipo: 'Grama', capturado: false },
    { id: 3, nome: 'Venusaur', numero_pokedex: 3, tipo: 'Grama', capturado: false },
    { id: 4, nome: 'Charmander', numero_pokedex: 4, tipo: 'Fogo', capturado: false },
    { id: 5, nome: 'Charmeleon', numero_pokedex: 5, tipo: 'Fogo', capturado: false },
    { id: 6, nome: 'Charizard', numero_pokedex: 6, tipo: 'Fogo', capturado: false },
    { id: 7, nome: 'Squirtle', numero_pokedex: 7, tipo: 'Água', capturado: false },
    { id: 8, nome: 'Wartortle', numero_pokedex: 8, tipo: 'Água', capturado: false },
    { id: 9, nome: 'Blastoise', numero_pokedex: 9, tipo: 'Água', capturado: false },
    { id: 10, nome: 'Caterpie', numero_pokedex: 10, tipo: 'Inseto', capturado: false },
    
  ];
  private nextId = 11;

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
