import type { Categoria } from "./Categoria";
import type { Usuario } from "./Usuario";

export interface Produto {
    id: number | null;
    nome: string;
    valorDebito: number;
    dataDebito: string;
    status: string;
    categoria: Categoria | null;
    usuario: Usuario | null;
}