import type { Produto } from "./Produto";

export interface Usuario {
    id: number;
    cpf: string;
    nome: string;
    dataNascimento: string;
    email: string;
    senha: string;
    tipo: string;
    produtos?: Produto[];
}