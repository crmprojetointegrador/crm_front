import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";
import type { Categoria } from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

const STATUS_OPCOES = ["Pendente", "Pago", "Atrasado"];

function FormProduto() {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const emEdicao = Boolean(id);

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nome: '',
        valorDebito: 0,
        dataDebito: '',
        status: '',
        categoria: null,
        usuario: null
    })

    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [categoriaId, setCategoriaId] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [erro, setErro] = useState('')

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        buscarCategorias()
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

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, (dados: Produto) => {
                setProduto(dados)
                setCategoriaId(dados.categoria ? String(dados.categoria.id) : '')
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

        setIsLoading(true)

        const categoriaSelecionada = categorias.find((c) => c.id === Number(categoriaId)) ?? null

        const payload: Produto = {
            ...produto,
            id: emEdicao ? Number(id) : 0,
            valorDebito: Number(produto.valorDebito),
            categoria: categoriaSelecionada
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
        <div className="flex justify-center items-center py-16 px-4">
            <form
                onSubmit={gerarNovoProduto}
                className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    {emEdicao ? 'Editar Cobrança' : 'Nova Cobrança'}
                </h1>

                {erro && (
                    <p className="text-sm text-red-600 text-center">{erro}</p>
                )}

                <div className="flex flex-col gap-1">
                    <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        value={produto.nome}
                        onChange={atualizarEstado}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="valorDebito" className="text-sm font-medium text-gray-700">
                        Valor do débito (R$)
                    </label>
                    <input
                        id="valorDebito"
                        name="valorDebito"
                        type="number"
                        step="0.01"
                        min="0"
                        value={produto.valorDebito}
                        onChange={atualizarEstado}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
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

                <div className="flex flex-col gap-1">
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

                <div className="flex flex-col gap-1">
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

                <div className="flex gap-3 mt-2">
                    <button
                        type="button"
                        onClick={retornar}
                        className="flex-1 border border-gray-300 text-gray-700 rounded-md py-2 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md py-2 flex justify-center disabled:opacity-60"
                        disabled={isLoading}
                    >
                        {isLoading ?
                            <ClipLoader color="#ffffff" size={20} /> :
                            <span>Salvar</span>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormProduto;
