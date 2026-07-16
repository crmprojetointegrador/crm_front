import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import type { Categoria } from "../../../models/Categoria"

function DeletarCategoria() {

    const navigate = useNavigate()

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarCategoria() {
        setIsLoading(true)

        try {
            await deletar(`/categorias/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Categoria apagado com sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                alert('Erro ao deletar o categoria.')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/categorias")
    }
    return (
        <div className='container mx-auto px-4 py-8'>
            <p className='text-center text-gray-500 text-sm mb-6'>
                Você tem certeza de que deseja apagar a categoria a seguir?
            </p>
            <div className='bg-white border border-[#a717eb]/20 rounded-xl shadow-sm overflow-hidden flex flex-col'>
                <header className='py-3 px-6 bg-[#faf5ff] border-b-2 border-[#a717eb] font-semibold text-[#7a12b0] uppercase text-sm tracking-wide'>
                    {categoria.nome}
                </header>
                <p className='p-6 text-gray-600 text-base'>{categoria.descricao}</p>
                <div className="flex justify-center gap-3 border-t border-gray-100 py-4 px-6">
                    <button
                        className="text-gray-500 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-full px-5 py-1.5 text-sm font-medium transition-colors"
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className="text-red-500 border hover:border-red-400 hover:bg-red-50 rounded-full px-5 py-1.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                        onClick={deletarCategoria}>

                        {isLoading ?
                            <ClipLoader
                                color="#ef4444"
                                size={14}
                            /> :
                            <span>Sim, deletar</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarCategoria