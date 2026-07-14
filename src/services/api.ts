import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Anexa o token salvo no login em toda requisição, automaticamente.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Se o token expirar/for inválido, o backend responde 401.
// Nesse caso, limpamos a sessão local — a UI decide o que fazer com isso
// (ex: redirecionar para /login) através do AuthContext.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
        }
        return Promise.reject(error);
    }
);

export default api;
