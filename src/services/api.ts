import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Anexa o token salvo no login em toda requisição, automaticamente.
// O backend já devolve o token com o prefixo "Bearer " incluso na string
// (ex: "Bearer eyJhbGci..."), então só adicionamos o prefixo se ele
// ainda não estiver lá — evita "Bearer Bearer ..." e um 401 por causa disso.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = token.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`;
    }

    return config;
});

// Se o token expirar/for inválido, o backend responde 401.
// Limpamos a sessão local e avisamos o resto do app via evento — é o
// AuthContext quem escuta isso e sincroniza o estado de usuário logado.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            window.dispatchEvent(new Event("auth:unauthorized"));
        }
        return Promise.reject(error);
    }
);

export default api;
