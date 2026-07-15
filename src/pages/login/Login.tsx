import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import UsuarioService from "../../services/UsuarioService";
import { useAuth } from "../../contexts/AuthContext";

const loginSchema = z.object({
    cpf: z.string().min(1, "Informe o CPF"),
    senha: z.string().min(1, "Informe a senha"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [erro, setErro] = useState("");

    const cadastroConcluido = Boolean(
        (location.state as { cadastroConcluido?: boolean } | null)?.cadastroConcluido
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(dados: LoginFormData) {
        setErro("");

        try {
            const resposta = await UsuarioService.logar(dados);
            login(resposta.data);
            navigate("/produtos");
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 401) {
                setErro("CPF ou senha inválidos.");
            } else {
                setErro("Não foi possível entrar. Tente novamente em instantes.");
            }
        }
    }

    return (
        <div className="flex justify-center items-center py-16 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-center text-gray-800">Entrar</h1>

                {cadastroConcluido && !erro && (
                    <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2 text-center">
                        Cadastro realizado! Entre com o CPF e a senha cadastrados.
                    </p>
                )}

                {erro && (
                    <p className="text-sm text-red-600 text-center">{erro}</p>
                )}

                <div className="flex flex-col gap-1">
                    <label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                        CPF
                    </label>
                    <input
                        id="cpf"
                        type="text"
                        autoComplete="username"
                        {...register("cpf")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.cpf && (
                        <span className="text-xs text-red-600">{errors.cpf.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="senha" className="text-sm font-medium text-gray-700">
                        Senha
                    </label>
                    <input
                        id="senha"
                        type="password"
                        autoComplete="current-password"
                        {...register("senha")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.senha && (
                        <span className="text-xs text-red-600">{errors.senha.message}</span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md py-2 disabled:opacity-60"
                >
                    {isSubmitting ? "Entrando..." : "Entrar"}
                </button>

                <p className="text-sm text-center text-gray-600">
                    Ainda não tem conta?{" "}
                    <Link to="/cadastro" className="text-purple-700 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
