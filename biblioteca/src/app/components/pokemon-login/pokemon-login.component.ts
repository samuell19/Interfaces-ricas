import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


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

  constructor(private router: Router, private auth: AuthService) {}

  onLogin() {
    this.loading = true;
    this.auth.login(this.login_obj.username, this.login_obj.password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.token) {
          this.auth.salvarToken(res.token);
          this.router.navigate(['/lista']);
        } else if (res.message) {
          console.log(res.message);
          this.router.navigate(['/lista']);
        } else {
          alert('Resposta do servidor inesperada');
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert(err?.error?.error || 'Usuário ou senha incorretos');
      }
    });
  }
}
