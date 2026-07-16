import { createContext, type ReactNode, useState } from "react"

import type { UsuarioLogin } from "../models/UsuarioLogin"
import { login, buscar } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"

const CHAVE_STORAGE = "inteliCob_usuario"

const USUARIO_VAZIO: UsuarioLogin = {
    id: 0,
    nome: "",
    cpf: "",
    senha: "",
    token: "",
    tipo: ""
}

function carregarUsuarioSalvo(): UsuarioLogin {
    try {
        const salvo = localStorage.getItem(CHAVE_STORAGE)
        if (!salvo) return USUARIO_VAZIO

        const usuario = JSON.parse(salvo) as UsuarioLogin

        // proteção básica: se o objeto salvo estiver incompleto/corrompido, ignora
        if (!usuario.token) return USUARIO_VAZIO

        return usuario
    } catch {
        return USUARIO_VAZIO
    }
}

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>(carregarUsuarioSalvo)

    const [isLoading, setIsLoading] = useState(false)

    function salvarUsuario(dados: UsuarioLogin) {
        setUsuario(dados)
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(dados))
    }

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)

        try {
            let dadosLogin = {} as UsuarioLogin

            await login(`/usuarios/logar`, usuarioLogin, (dados: UsuarioLogin) => {
                dadosLogin = dados
            })

            try {
                await buscar(`/usuarios/${dadosLogin.id}`, (dadosUsuario: any) => {
                    salvarUsuario({ ...dadosLogin, tipo: dadosUsuario.tipo ?? "user" })
                }, {
                    headers: { Authorization: dadosLogin.token }
                })
            } catch {
                salvarUsuario({ ...dadosLogin, tipo: "user" })
            }

            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
        }

        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario(USUARIO_VAZIO)
        localStorage.removeItem(CHAVE_STORAGE)
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}