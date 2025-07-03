import { Component, Input, Output, EventEmitter } from '@angular/core'; // <- faltava importar EventEmitter
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-delete',
  standalone: true,
  imports: [CommonModule, ButtonModule, ConfirmDialogModule],
  template: `
    <button
      pButton
      icon="pi pi-trash"
      class="p-button-danger"
      label="Excluir"
      (click)="confirmarRemocao()">
    </button>

    <p-confirmDialog></p-confirmDialog>
  `,
  providers: [ConfirmationService]
})
export class PokemonDeleteComponent {
  @Input() pokemon!: Pokemon;
  @Output() onDelete = new EventEmitter<number>();

  constructor(private confirmationService: ConfirmationService, private pokemonService: PokemonService) {}

  confirmarRemocao() {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o Pokémon ${this.pokemon.nome}?`,
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      
      accept: () => {
        this.pokemonService.remover(this.pokemon.id);
        this.onDelete.emit(this.pokemon.id)
      } 
    });
  }
}
