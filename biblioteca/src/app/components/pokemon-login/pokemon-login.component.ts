import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pokemon-login.component.html',
  styleUrls: ['./pokemon-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonLoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder, private router: Router, private auth: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { username, password } = this.loginForm.value;
    this.auth.login(username, password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.token) {
          this.auth.salvarToken(res.token);
          console.log('Token JWT recebido:', res.token);
          this.auth.logarConteudoToken();
          this.router.navigate(['/lista']);
        } else {
          alert(res.message || 'Resposta inesperada do servidor.');
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert(err?.error?.error || 'Erro desconhecido ao tentar fazer login.');
      }
    });
  }
}