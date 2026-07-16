import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type { Produto } from "../../../models/Produto"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"

function DeletarProduto() {

    const navigate = useNavigate()

    const [produto, setProduto] = useState<Produto>({} as Produto)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarProduto() {
        setIsLoading(true)

        try {
            await deletar(`/produtos/${id}`, {
                headers: { Authorization: token }
            })
            alert('Cobrança apagada com sucesso!')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                alert('Erro ao deletar a cobrança.')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate('/produtos')
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <p className='text-center text-gray-500 text-sm mb-6'>
                Você tem certeza de que deseja apagar a cobrança a seguir?
            </p>
            <div className='bg-white border border-[#a717eb]/20 rounded-xl shadow-sm overflow-hidden flex flex-col'>
                <header className='py-3 px-6 bg-[#faf5ff] border-b-2 border-[#a717eb]'>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <span className="text-xs font-normal text-gray-500 block">Cliente</span>
                            <span className="text-base font-semibold text-gray-800">
                                {produto.usuario?.nome || 'Não atribuído'}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs font-normal text-gray-500 block">Cobrança</span>
                            <span className="text-base font-semibold text-gray-800">
                                {produto.nome}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs font-normal text-gray-500 block">Categoria</span>
                            <span className="text-base font-semibold text-gray-800">
                                {produto.categoria?.nome || 'Sem categoria'}
                            </span>
                        </div>
                    </div>
                </header>
                <p className='p-6 text-gray-600 text-base'>
                    Valor: R$ {produto.valorDebito?.toFixed(2).replace('.', ',')}
                </p>
                <div className="flex justify-center gap-3 border-t border-gray-100 py-4 px-6">
                    <button
                        className="text-gray-500 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-full px-5 py-1.5 text-sm font-medium transition-colors"
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className="text-red-500 border hover:border-red-400 hover:bg-red-50 rounded-full px-5 py-1.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                        onClick={deletarProduto}>
                        {isLoading ?
                            <ClipLoader color="#ef4444" size={14} /> :
                            <span>Sim, deletar</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto