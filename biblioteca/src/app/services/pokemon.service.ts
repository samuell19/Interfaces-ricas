import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly apiUrl = 'http://localhost:3000/Pokemon';

  constructor(private http: HttpClient) { }
  
  listar(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl);
  }

  adicionar(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.apiUrl, pokemon);
  }

  atualizar(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.apiUrl}/${pokemon.id}`, pokemon);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  buscarPorId(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
  }