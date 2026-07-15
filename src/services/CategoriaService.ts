import api from "./api";
import type { Categoria } from "../models/Categoria";

class CategoriaService {

    getAll() {
        return api.get<Categoria[]>("/categorias");
    }

    getById(id: number) {
        return api.get<Categoria>(`/categorias/${id}`);
    }

}

export default new CategoriaService();
