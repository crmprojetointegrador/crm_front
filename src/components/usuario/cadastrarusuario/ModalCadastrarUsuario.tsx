import { useState, type ChangeEvent, type FormEvent } from "react"
import { cadastrarUsuario } from "../../../services/Service"
import type { Usuario } from "../../../models/Usuario"
import { ClipLoader } from "react-spinners"
import { FiX, FiCheckCircle } from "react-icons/fi"

const TIPO_CLIENTE = "user"
const IDADE_MINIMA = 16

const USUARIO_VAZIO: Usuario = {
    id: 0,
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    senha: '',
    tipo: TIPO_CLIENTE
}

interface ModalCadastrarUsuarioProps {
    aberto: boolean
    onFechar: () => void
    onCadastrado: () => void
}

function ModalCadastrarUsuario({ aberto, onFechar, onCadastrado }: ModalCadastrarUsuarioProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [erro, setErro] = useState<string>("")
    const [sucesso, setSucesso] = useState<string>("")
    const [confirmarSenha, setConfirmaSenha] = useState<string>("")
    const [novoUsuario, setNovoUsuario] = useState<Usuario>(USUARIO_VAZIO)

    if (!aberto) return null

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setNovoUsuario({
            ...novoUsuario,
            [e.target.name]: e.target.value
        })
    }

    function atualizarCpf(e: ChangeEvent<HTMLInputElement>) {
        const somenteDigitos = e.target.value.replace(/\D/g, '').slice(0, 11)
        setNovoUsuario({
            ...novoUsuario,
            cpf: somenteDigitos
        })
    }

    function calcularIdade(dataNascimento: string): number {
        const hoje = new Date()
        const nascimento = new Date(dataNascimento)

        let idade = hoje.getFullYear() - nascimento.getFullYear()
        const aindaNaoFezAniversarioEsseAno =
            hoje.getMonth() < nascimento.getMonth() ||
            (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())

        if (aindaNaoFezAniversarioEsseAno) {
            idade--
        }

        return idade
    }

    function limparFormulario() {
        setNovoUsuario(USUARIO_VAZIO)
        setConfirmaSenha('')
    }

    function fecharModal() {
        limparFormulario()
        setErro('')
        setSucesso('')
        onFechar()
    }

    async function handleCadastrar(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErro('')
        setSucesso('')

        if (!novoUsuario.nome || novoUsuario.cpf.length !== 11 || !novoUsuario.email) {
            setErro('Preencha nome, CPF (11 dígitos) e e-mail.')
            return
        }

        if (!novoUsuario.dataNascimento) {
            setErro('Informe a data de nascimento.')
            return
        }

        if (calcularIdade(novoUsuario.dataNascimento) < IDADE_MINIMA) {
            setErro(`É necessário ter pelo menos ${IDADE_MINIMA} anos para ser cadastrado.`)
            return
        }

        if (confirmarSenha !== novoUsuario.senha || novoUsuario.senha.length < 6) {
            setErro('Senha e confirmação precisam ser iguais e ter pelo menos 6 caracteres.')
            return
        }

        setIsLoading(true)

        try {
            await cadastrarUsuario('/usuarios/cadastrar', novoUsuario, () => {})
            setSucesso(`"${novoUsuario.nome}" cadastrado! Pode seguir pro próximo.`)
            limparFormulario()
            onCadastrado()
        } catch (error: any) {
            setErro('Não foi possível cadastrar. Confira se o CPF já não está em uso.')
        }

        setIsLoading(false)
    }

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={fecharModal}
        >
            <div
                className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Novo Usuário</h2>
                        <p className="text-sm text-gray-500">Cadastro de cliente/devedor no sistema.</p>
                    </div>
                    <button
                        type="button"
                        onClick={fecharModal}
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {erro && (
                    <p className="text-sm text-red-600 text-center">{erro}</p>
                )}

                {sucesso && (
                    <p className="text-sm text-green-600 text-center flex items-center justify-center gap-1">
                        <FiCheckCircle /> {sucesso}
                    </p>
                )}

                <form onSubmit={handleCadastrar} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome completo</label>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            value={novoUsuario.nome}
                            onChange={atualizarEstado}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF</label>
                        <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            inputMode="numeric"
                            maxLength={11}
                            placeholder="Somente números"
                            autoComplete="off"
                            value={novoUsuario.cpf}
                            onChange={atualizarCpf}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700">Data de nascimento</label>
                        <input
                            id="dataNascimento"
                            name="dataNascimento"
                            type="date"
                            value={novoUsuario.dataNascimento}
                            onChange={atualizarEstado}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={novoUsuario.email}
                            onChange={atualizarEstado}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="senha" className="text-sm font-medium text-gray-700">Senha</label>
                        <input
                            id="senha"
                            name="senha"
                            type="password"
                            autoComplete="new-password"
                            value={novoUsuario.senha}
                            onChange={atualizarEstado}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmarSenha" className="text-sm font-medium text-gray-700">Confirmar Senha</label>
                        <input
                            id="confirmarSenha"
                            name="confirmarSenha"
                            type="password"
                            autoComplete="new-password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmaSenha(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={fecharModal}
                            className="flex-1 border border-gray-300 text-gray-700 rounded-md py-2 hover:bg-gray-50"
                        >
                            Concluir
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md py-2 flex justify-center disabled:opacity-60"
                            disabled={isLoading}
                        >
                            {isLoading ?
                                <ClipLoader color="#ffffff" size={20} /> :
                                <span>Cadastrar</span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalCadastrarUsuario
