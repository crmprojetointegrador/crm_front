import api from "./api";
import type { UsuarioLogin } from "../models/UsuarioLogin";
import type { Usuario } from "../models/Usuario";

class UsuarioService {

    logar(dadosLogin: Pick<UsuarioLogin, "cpf" | "senha">) {
        return api.post<UsuarioLogin>("/usuarios/logar", dadosLogin);
    }

    cadastrar(usuario: Omit<Usuario, "id" | "produtos">) {
        return api.post<Usuario>("/usuarios/cadastrar", usuario);
    }

}

export default new UsuarioService();
