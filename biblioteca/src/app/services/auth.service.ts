import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; 

interface LoginResponse {
  token?: string;
  message?: string;
}

interface JwtPayload {
  id: string;
  nome: string;
  iat: number;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  logarConteudoToken() {
  const token = this.pegarToken();
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log('Conteúdo do token JWT:', decoded);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  } else {
    console.warn('Nenhum token encontrado.');
  }
}

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

  isTokenExpirado(): boolean {
    const token = this.pegarToken();
    if (!token) return true;

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const expiracaoEmMs = decodedToken.exp * 1000;
      return expiracaoEmMs < Date.now();
    } catch (error) {
      return true; 
    }
  }
  
  estaLogado(): boolean {
    return !this.isTokenExpirado();
  }

  obterNomeUsuarioLogado(): string | null {
    const token = this.pegarToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken?.nome ?? null;
      } catch (error) {
        return null;
      }
    }
    return null;
  }
}

