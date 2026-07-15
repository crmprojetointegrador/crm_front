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
            navigate('/login')
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
        <div className='container w-full max-w-sm mx-auto py-16 px-4'>
            <h1 className='text-2xl font-bold text-center mb-4'>Deletar Cobrança</h1>
            <p className='text-center text-gray-600 mb-4'>
                Você tem certeza de que deseja apagar a cobrança a seguir?
            </p>
            <div className='border border-gray-200 rounded-lg overflow-hidden flex flex-col'>
                <header className='py-2 px-4 bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-bold'>
                    {produto.nome}
                </header>
                <p className='p-4 bg-gray-50 text-gray-700'>
                    Valor: R$ {produto.valorDebito?.toFixed(2)}
                </p>
                <div className="flex">
                    <button
                        className='text-white bg-gray-400 hover:bg-gray-500 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className='w-full text-white bg-red-500 hover:bg-red-600 flex items-center justify-center py-2'
                        onClick={deletarProduto}>
                        {isLoading ?
                            <ClipLoader color="#ffffff" size={20} /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto
