import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-delete',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <button
      pButton
      type="button"
      icon="pi pi-trash"
      class="p-button-danger"
      (click)="confirmarRemocao()">
    </button>
  `,
 
})
export class PokemonDeleteComponent {
  @Input() pokemon!: Pokemon;
  @Output() onDelete = new EventEmitter<number | string>();

  constructor(
    private confirmationService: ConfirmationService,
    private pokemonService: PokemonService,
    private messageService: MessageService
  ) {}

  confirmarRemocao() {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o Pokémon ${this.pokemon.nome}?`,
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.pokemonService.remover(this.pokemon.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pokémon excluído!' });
            this.onDelete.emit(this.pokemon.id);
          },
          error: (err) => {
            console.error('Erro ao remover Pokémon', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir o Pokémon.' });
          }
        });
      }
    });
  }
}