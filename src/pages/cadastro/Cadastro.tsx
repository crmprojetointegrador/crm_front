import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import UsuarioService from "../../services/UsuarioService";

// Tipo de conta criado por autocadastro. Não é exposto como campo no
// formulário — permitir que o próprio usuário escolha o "tipo" na hora do
// cadastro abriria brecha pra ele se autopromover, por exemplo, a admin.
const TIPO_PADRAO = "USER";

const cadastroSchema = z
    .object({
        nome: z.string().min(3, "Informe seu nome completo"),
        cpf: z
            .string()
            .min(11, "CPF deve ter 11 dígitos")
            .max(11, "CPF deve ter 11 dígitos")
            .regex(/^\d+$/, "CPF deve conter apenas números"),
        dataNascimento: z.string().min(1, "Informe a data de nascimento"),
        email: z.string().email("Informe um e-mail válido"),
        senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        confirmarSenha: z.string().min(1, "Confirme a senha"),
    })
    .refine((dados) => dados.senha === dados.confirmarSenha, {
        message: "As senhas não coincidem",
        path: ["confirmarSenha"],
    });

type CadastroFormData = z.infer<typeof cadastroSchema>;

function Cadastro() {
    const navigate = useNavigate();
    const [erro, setErro] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CadastroFormData>({
        resolver: zodResolver(cadastroSchema),
    });

    async function onSubmit(dados: CadastroFormData) {
        setErro("");

        try {
            await UsuarioService.cadastrar({
                nome: dados.nome,
                cpf: dados.cpf,
                dataNascimento: dados.dataNascimento,
                email: dados.email,
                senha: dados.senha,
                tipo: TIPO_PADRAO,
            });

            navigate("/login", { state: { cadastroConcluido: true } });
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 400) {
                setErro("Não foi possível cadastrar. Confira os dados informados.");
            } else {
                setErro("Não foi possível cadastrar. Tente novamente em instantes.");
            }
        }
    }

    return (
        <div className="flex justify-center items-center py-16 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-center text-gray-800">Criar conta</h1>

                {erro && (
                    <p className="text-sm text-red-600 text-center">{erro}</p>
                )}

                <div className="flex flex-col gap-1">
                    <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                        Nome completo
                    </label>
                    <input
                        id="nome"
                        type="text"
                        autoComplete="name"
                        {...register("nome")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.nome && (
                        <span className="text-xs text-red-600">{errors.nome.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                        CPF
                    </label>
                    <input
                        id="cpf"
                        type="text"
                        inputMode="numeric"
                        placeholder="Somente números"
                        autoComplete="off"
                        {...register("cpf")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.cpf && (
                        <span className="text-xs text-red-600">{errors.cpf.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700">
                        Data de nascimento
                    </label>
                    <input
                        id="dataNascimento"
                        type="date"
                        autoComplete="bday"
                        {...register("dataNascimento")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.dataNascimento && (
                        <span className="text-xs text-red-600">{errors.dataNascimento.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register("email")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.email && (
                        <span className="text-xs text-red-600">{errors.email.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="senha" className="text-sm font-medium text-gray-700">
                        Senha
                    </label>
                    <input
                        id="senha"
                        type="password"
                        autoComplete="new-password"
                        {...register("senha")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.senha && (
                        <span className="text-xs text-red-600">{errors.senha.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmarSenha" className="text-sm font-medium text-gray-700">
                        Confirmar senha
                    </label>
                    <input
                        id="confirmarSenha"
                        type="password"
                        autoComplete="new-password"
                        {...register("confirmarSenha")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.confirmarSenha && (
                        <span className="text-xs text-red-600">{errors.confirmarSenha.message}</span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md py-2 disabled:opacity-60"
                >
                    {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </button>

                <p className="text-sm text-center text-gray-600">
                    Já tem conta?{" "}
                    <Link to="/login" className="text-purple-700 hover:underline">
                        Entrar
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Cadastro;
