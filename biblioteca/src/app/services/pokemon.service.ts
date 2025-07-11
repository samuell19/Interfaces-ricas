import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
 
  private readonly apiUrl = 'http://localhost:3000/Pokemon';

  constructor(private http: HttpClient) { }
  listar(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl);
  }

  buscarPorId(id: number | string): Observable<Pokemon> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Pokemon>(url);
  }

  adicionar(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.apiUrl, pokemon);
  }

  atualizar(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.apiUrl}/${pokemon.id}`;
    return this.http.put<Pokemon>(url, pokemon);
  }

  remover(id: number | string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}