import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { UsuarioLogin } from "../models/UsuarioLogin";

interface AuthContextData {
    usuario: UsuarioLogin | null;
    isAuthenticated: boolean;
    login: (dadosUsuario: UsuarioLogin) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

function getUsuarioSalvo(): UsuarioLogin | null {
    const bruto = localStorage.getItem("usuario");
    if (!bruto) return null;

    try {
        return JSON.parse(bruto) as UsuarioLogin;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<UsuarioLogin | null>(getUsuarioSalvo);

    function login(dadosUsuario: UsuarioLogin) {
        localStorage.setItem("usuario", JSON.stringify(dadosUsuario));

        if (dadosUsuario.token) {
            localStorage.setItem("token", dadosUsuario.token);
        }

        setUsuario(dadosUsuario);
    }

    function logout() {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        setUsuario(null);
    }

    // Sincroniza o estado de autenticação sempre que uma chamada à API
    // voltar 401 (token expirado/inválido) — sem isso, a Navbar continuava
    // mostrando o usuário como logado mesmo com a sessão já morta.
    useEffect(() => {
        function handleUnauthorized() {
            setUsuario(null);
        }

        window.addEventListener("auth:unauthorized", handleUnauthorized);
        return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
    }, []);

    return (
        <AuthContext.Provider
            value={{ usuario, isAuthenticated: !!usuario, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth precisa ser usado dentro de um <AuthProvider>");
    }

    return context;
}
