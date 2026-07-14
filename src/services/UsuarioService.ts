import api from "./api";
import type { UsuarioLogin } from "../models/UsuarioLogin";

class UsuarioService {

    logar(dadosLogin: Pick<UsuarioLogin, "cpf" | "senha">) {
        return api.post<UsuarioLogin>("/usuarios/logar", dadosLogin);
    }

}

export default new UsuarioService();
