import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { cadastrarUsuario } from "../../services/Service"
import { ClipLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import type { Usuario } from "../../models/Usuario"

const TIPO_PADRAO = "USER"
const IDADE_MINIMA = 16

function Cadastro() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [confirmarSenha, setConfirmaSenha] = useState<string>("")
    const [erro, setErro] = useState<string>("")

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        cpf: '',
        dataNascimento: '',
        email: '',
        senha: '',
        tipo: TIPO_PADRAO
    })

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar()
        }
    }, [usuario])

    function retornar() {
        navigate('/login')
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    function atualizarCpf(e: ChangeEvent<HTMLInputElement>) {
        const somenteDigitos = e.target.value.replace(/\D/g, '').slice(0, 11)
        setUsuario({
            ...usuario,
            cpf: somenteDigitos
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value)
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

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErro('')

        if (usuario.cpf.length !== 11) {
            setErro('Informe um CPF válido, com 11 dígitos.')
            return
        }

        if (!usuario.dataNascimento) {
            setErro('Informe a data de nascimento.')
            return
        }

        if (calcularIdade(usuario.dataNascimento) < IDADE_MINIMA) {
            setErro(`É necessário ter pelo menos ${IDADE_MINIMA} anos para se cadastrar.`)
            return
        }

        if (confirmarSenha !== usuario.senha || usuario.senha.length < 6) {
            setErro('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
            setUsuario({ ...usuario, senha: '' })
            setConfirmaSenha('')
            return
        }

        setIsLoading(true)

        try {
            await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
            alert('Usuário cadastrado com sucesso!')
        } catch (error) {
            setErro('Não foi possível cadastrar. Confira se o CPF já não está em uso.')
        }

        setIsLoading(false)
    }


    return (
        <div className="flex justify-center items-center py-16 px-4">
            <form className='flex justify-center items-center flex-col w-full max-w-sm gap-3'
                onSubmit={cadastrarNovoUsuario}>

                <h2 className='text-slate-900 text-3xl font-bold'>Cadastrar</h2>

                {erro && (
                    <p className="text-sm text-red-600 text-center">{erro}</p>
                )}

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome completo</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome"
                        autoComplete="name"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={usuario.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF</label>
                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        placeholder="Somente números"
                        inputMode="numeric"
                        maxLength={11}
                        autoComplete="off"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={usuario.cpf}
                        onChange={atualizarCpf}
                    />
                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700">Data de nascimento</label>
                    <input
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        autoComplete="bday"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={usuario.dataNascimento}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        autoComplete="email"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={usuario.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="senha" className="text-sm font-medium text-gray-700">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Senha"
                        autoComplete="new-password"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={usuario.senha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="confirmarSenha" className="text-sm font-medium text-gray-700">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        placeholder="Confirmar Senha"
                        autoComplete="new-password"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={confirmarSenha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                    />
                </div>

                <div className="flex justify-around w-full gap-4 mt-2">
                    <button
                        type='button'
                        className='rounded-md text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
                        onClick={retornar}
                    >
                        Cancelar
                    </button>
                    <button
                        type='submit'
                        className='rounded-md text-white bg-gradient-to-r from-[#a717eb] to-[#00e8ff] w-1/2 py-2 flex justify-center'
                        disabled={isLoading}
                    >
                        {isLoading ?
                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            /> :

                            <span>Cadastrar</span>
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Cadastro