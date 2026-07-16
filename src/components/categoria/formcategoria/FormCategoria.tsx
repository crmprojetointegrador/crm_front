import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import type { Categoria } from "../../../models/Categoria";

function FormCategoria() {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/categorias")
    }

    async function gerarNovoCategoria(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categoria, setCategoria, {
                    headers: { 'Authorization': token }
                })
                alert('O Categoria foi atualizado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o categoria.')
                }

            }
        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria, {
                    headers: { 'Authorization': token }
                })
                alert('O Categoria foi cadastrado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o categoria.')
                }

            }
        }

        setIsLoading(false)
        retornar()
    }
    return (
        <div className='container mx-auto px-4 py-8'>
            <p className='text-center text-gray-500 text-sm mb-6'>
                {id === undefined ? 'Preencha os dados para cadastrar uma nova categoria' : 'Atualize os dados da categoria a seguir'}
            </p>
            <div className='bg-white border border-[#a717eb]/20 rounded-xl shadow-sm overflow-hidden flex flex-col'>
                <header className='py-3 px-6 bg-[#faf5ff] border-b-2 border-[#a717eb] font-semibold text-[#7a12b0] uppercase text-sm tracking-wide'>
                    {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
                </header>
                <form className="p-6 flex flex-col gap-4" onSubmit={gerarNovoCategoria}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            placeholder="Insira nome da categoria"
                            name='nome'
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={categoria.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="descricao" className="text-sm font-medium text-gray-700">Descrição da Categoria</label>
                        <input
                            id="descricao"
                            type="text"
                            placeholder="Descreva aqui sua categoria"
                            name='descricao'
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={categoria.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex justify-center gap-3 border-t border-gray-100 pt-4 mt-2">
                        <button
                            type="button"
                            className="text-gray-500 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-full px-5 py-1.5 text-sm font-medium transition-colors"
                            onClick={retornar}>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] bg-clip-text text-transparent font-semibold rounded-full px-4 py-2 text-sm border border-transparent hover:border-[#a717eb] transition-colors duration-300">
                            {isLoading ?
                                <ClipLoader
                                    color="#ffffff"
                                    size={14}
                                /> :
                                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>


    );
}

export default FormCategoria;