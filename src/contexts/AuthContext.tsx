import { createContext, type ReactNode, useState } from "react"

import type { UsuarioLogin } from "../models/UsuarioLogin"
import { login, buscar } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"

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

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        cpf: "",
        senha: "",
        token: "",
        tipo: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)

        try {
            let dadosLogin = {} as UsuarioLogin

            await login(`/usuarios/logar`, usuarioLogin, (dados: UsuarioLogin) => {
                dadosLogin = dados
            })


            try {
                await buscar(`/usuarios/${dadosLogin.id}`, (dadosUsuario: any) => {
                    setUsuario({ ...dadosLogin, tipo: dadosUsuario.tipo ?? "user" })
                }, {
                    headers: { Authorization: dadosLogin.token }
                })
            } catch {

                setUsuario({ ...dadosLogin, tipo: "user" })
            }

            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
        }

        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            cpf: "",
            senha: "",
            token: "",
            tipo: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}