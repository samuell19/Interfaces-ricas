import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-pokemon-login',
  imports: [FormsModule],
  templateUrl: './pokemon-login.component.html',
  styleUrls: ['./pokemon-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonLoginComponent {
  login_obj = {
    username: '',
    password: ''
  };

  loading = false;
  constructor(private router: Router, private auth: AuthService, private http: HttpClient) {}

  onLogin() {
  this.loading = true;

  this.http.post<{ token?: string, message?: string }>(
    "https://biblioteca-pokemon-api.herokuapp.com/login",
    this.login_obj
  ).subscribe({
    next: (res) => {
      this.loading = false;

      if (res.token) {
        this.auth.salvarToken(res.token);  // Salva o JWT
        this.router.navigate(['/lista']);  // Redireciona após login
      } else if (res.message) {
        alert(res.message);                // Mostra mensagem do backend (ex: erro de login)
      } else {
        alert('Resposta do servidor inesperada');  // Caso o formato da resposta seja estranho
      }
    },
    error: (err) => {
      this.loading = false;
      console.error(err);
      alert(err?.error?.error || 'Erro desconhecido ao tentar fazer login');
    }
  });
}
}
