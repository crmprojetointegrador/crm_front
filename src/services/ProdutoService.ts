import api from "./api";
import type { Produto } from "../models/Produto";

class ProdutoService {

    getAll() {
        return api.get<Produto[]>("/produtos");
    }

    getById(id: number) {
        return api.get<Produto>(`/produtos/${id}`);
    }

    getByStatus(status: string) {
        return api.get<Produto[]>(`/produtos/status/${status}`);
    }

    getByCategoria(categoriaId: number) {
        return api.get<Produto[]>(`/produtos/categoria/${categoriaId}`);
    }

    post(produto: Produto) {
        return api.post<Produto>("/produtos", produto);
    }

    put(produto: Produto) {
        return api.put<Produto>("/produtos", produto);
    }

    delete(id: number) {
        return api.delete(`/produtos/${id}`);
    }

    atualizarStatus(id: number, novoStatus: string) {
        return api.put(`/produtos/atualizar-status/${id}`, novoStatus);
    }

}

export default new ProdutoService();
