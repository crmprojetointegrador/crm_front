import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";
import type { Categoria } from "../../../models/Categoria";
import type { Usuario } from "../../../models/Usuario";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

const STATUS_OPCOES = ["Pago", "Em acordo", "Em atraso", "Sem negociação"];

function FormProduto() {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const emEdicao = Boolean(id);

    const [produto, setProduto] = useState<Produto>({
        id: null,
        nome: '',
        valorDebito: 0,
        dataDebito: '',
        status: '',
        categoria: null,
        usuario: null
    })

    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [categoriaId, setCategoriaId] = useState<string>('')

    // Busca do usuário responsável (só usado quando quem está logado é admin)
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [buscaUsuario, setBuscaUsuario] = useState<string>('')
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null)
    const [sugestoesAbertas, setSugestoesAbertas] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [erro, setErro] = useState('')

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const isAdmin = usuario.tipo?.toLowerCase() === "admin"

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        buscarCategorias()
        if (isAdmin) {
            buscarUsuarios()
        }
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarUsuarios() {
        try {
            await buscar('/usuarios/all', setUsuarios, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, (dados: Produto) => {
                setProduto(dados)
                setCategoriaId(dados.categoria ? String(dados.categoria.id) : '')
                if (dados.usuario) {
                    setUsuarioSelecionado(dados.usuario)
                    setBuscaUsuario(dados.usuario.nome)
                }
            }, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value
        })
    }

    function atualizarCategoria(e: ChangeEvent<HTMLSelectElement>) {
        setCategoriaId(e.target.value)
    }

    function atualizarStatus(e: ChangeEvent<HTMLSelectElement>) {
        setProduto({
            ...produto,
            status: e.target.value
        })
    }

    function atualizarBuscaUsuario(e: ChangeEvent<HTMLInputElement>) {
        setBuscaUsuario(e.target.value)
        setUsuarioSelecionado(null)
        setSugestoesAbertas(true)
    }

    function selecionarUsuario(u: Usuario) {
        setUsuarioSelecionado(u)
        setBuscaUsuario(u.nome)
        setSugestoesAbertas(false)
    }

    function limparUsuarioSelecionado() {
        setUsuarioSelecionado(null)
        setBuscaUsuario('')
        setSugestoesAbertas(false)
    }

    const termo = buscaUsuario.trim().toLowerCase()
    const sugestoes = termo.length === 0
        ? []
        : usuarios.filter((u) =>
            u.nome.toLowerCase().includes(termo) ||
            u.cpf?.toLowerCase().includes(termo)
        ).slice(0, 6)

    function retornar() {
        navigate('/produtos')
    }

    async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErro('')

        if (!produto.nome || !produto.dataDebito || !produto.status || !categoriaId) {
            setErro('Preencha todos os campos.')
            return
        }

        if (isAdmin && !usuarioSelecionado) {
            setErro('Busque e selecione o usuário responsável pela cobrança.')
            return
        }

        setIsLoading(true)

        const categoriaSelecionada = categorias.find((c) => c.id === Number(categoriaId)) ?? null

        const usuarioResponsavel: Usuario | null = isAdmin
            ? (usuarioSelecionado ? ({ id: usuarioSelecionado.id } as Usuario) : null)
            : ({ id: usuario.id } as Usuario)

        const payload: Produto = {
            ...produto,
            id: emEdicao ? Number(id) : null,
            valorDebito: Number(produto.valorDebito),
            categoria: categoriaSelecionada,
            usuario: usuarioResponsavel
        }

        try {
            if (emEdicao) {
                await atualizar('/produtos', payload, setProduto, {
                    headers: { Authorization: token }
                })
                alert('Cobrança atualizada com sucesso!')
            } else {
                await cadastrar('/produtos', payload, setProduto, {
                    headers: { Authorization: token }
                })
                alert('Cobrança cadastrada com sucesso!')
            }
            retornar()
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                setErro('Não foi possível salvar a cobrança. Confira os dados e tente novamente.')
            }
        }

        setIsLoading(false)
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <p className='text-center text-gray-500 text-sm mb-6'>
                {emEdicao ? 'Atualize os dados da cobrança a seguir' : 'Preencha os dados para cadastrar uma nova cobrança'}
            </p>
            <div className='bg-white border border-[#a717eb]/20 rounded-xl shadow-sm overflow-hidden flex flex-col'>
                <header className='py-3 px-6 bg-[#faf5ff] border-b-2 border-[#a717eb] font-semibold text-[#7a12b0] uppercase text-sm tracking-wide'>
                    {emEdicao ? 'Editar Cobrança' : 'Cadastrar Cobrança'}
                </header>

                <form className="p-6 flex flex-col gap-4" onSubmit={gerarNovoProduto}>
                    {erro && (
                        <p className="text-sm text-red-600 text-center">{erro}</p>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                                Parcela
                            </label>
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="Exemplo: Parcela 05/30, Limite especial... "
                                value={produto.nome}
                                onChange={atualizarEstado}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="valorDebito" className="text-sm font-medium text-gray-700">
                                Valor do débito (R$)
                            </label>
                            <input
                                id="valorDebito"
                                name="valorDebito"
                                type="number"
                                step="0.01"
                                min="0"
                                value={produto.valorDebito || ''}
                                onChange={atualizarEstado}
                                placeholder="0,00"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="dataDebito" className="text-sm font-medium text-gray-700">
                            Data do débito
                        </label>
                        <input
                            id="dataDebito"
                            name="dataDebito"
                            type="date"
                            value={produto.dataDebito}
                            onChange={atualizarEstado}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="status" className="text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                value={produto.status}
                                onChange={atualizarStatus}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="" disabled>Selecione...</option>
                                {STATUS_OPCOES.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="categoriaId" className="text-sm font-medium text-gray-700">
                                Categoria
                            </label>
                            <select
                                id="categoriaId"
                                value={categoriaId}
                                onChange={atualizarCategoria}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="" disabled>Selecione...</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                            {categorias.length === 0 && (
                                <span className="text-xs text-gray-500">Nenhuma categoria cadastrada ainda.</span>
                            )}
                        </div>
                    </div>

                    {isAdmin && (
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="buscaUsuario" className="text-sm font-medium text-gray-700">
                                Atribuir a (nome ou CPF)
                            </label>

                            <div className="relative">
                                <input
                                    id="buscaUsuario"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Digite o nome ou CPF..."
                                    value={buscaUsuario}
                                    onChange={atualizarBuscaUsuario}
                                    onFocus={() => setSugestoesAbertas(true)}
                                    onBlur={() => setTimeout(() => setSugestoesAbertas(false), 150)}
                                    className="border border-gray-300 rounded-md px-3 py-2 pr-8 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {usuarioSelecionado && (
                                    <button
                                        type="button"
                                        onClick={limparUsuarioSelecionado}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                                        title="Trocar usuário"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {usuarioSelecionado && (
                                <span className="text-xs text-green-600">
                                    Selecionado: {usuarioSelecionado.nome} {usuarioSelecionado.tipo === "admin" ? "(admin)" : ""}
                                </span>
                            )}

                            {sugestoesAbertas && !usuarioSelecionado && sugestoes.length > 0 && (
                                <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-y-auto z-10">
                                    {sugestoes.map((u) => (
                                        <li key={u.id}>
                                            <button
                                                type="button"
                                                onClick={() => selecionarUsuario(u)}
                                                className="w-full text-left px-3 py-2 hover:bg-purple-50 text-sm"
                                            >
                                                <span className="font-medium text-gray-800">{u.nome}</span>
                                                <span className="text-gray-500"> — CPF {u.cpf}</span>
                                                {u.tipo === "admin" && (
                                                    <span className="text-purple-600"> (admin)</span>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    <div className="flex justify-center gap-3 border-t border-gray-100 pt-4 mt-2">
                        <button
                            type="button"
                            className="text-gray-500 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-full px-5 py-1.5 text-sm font-medium transition-colors"
                            onClick={retornar}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] bg-clip-text text-transparent font-semibold rounded-full px-4 py-2 text-sm border border-transparent hover:border-[#a717eb] transition-colors duration-300"
                        >
                            {isLoading ?
                                <ClipLoader color="#ffffff" size={14} /> :
                                <span>{emEdicao ? 'Atualizar' : 'Cadastrar'}</span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormProduto;