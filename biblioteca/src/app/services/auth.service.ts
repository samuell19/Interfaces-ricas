// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token?: string;      
  message?: string;   
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/login`, { nome: username, senha: password });
  }

  salvarToken(token: string) {
    localStorage.setItem('token', token);
  }

  pegarToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  estaLogado(): boolean {
    return !!this.pegarToken();
  }
}
