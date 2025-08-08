export interface Pokemon {
  id: number;
  nome: string;
  numero_pokedex: number;
  tipo: string;
  capturado: boolean;
  foto: string; 
}
export interface Usuario {
  id: number;
  nome: string;      
  senha: string;      
}