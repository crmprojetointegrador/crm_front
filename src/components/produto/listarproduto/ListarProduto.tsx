import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardproduto/CardProduto";

function ListarProdutos() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [produtos, setProdutos] = useState<Produto[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarProdutos()
    }, [produtos.length])

    async function buscarProdutos() {
        try {
            setIsLoading(true)

            await buscar('/produtos', setProdutos, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Produtos</h1>
                    <Link
                        to="/cadastrarproduto"
                        className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] bg-clip-text text-transparent font-semibold rounded-md px-4 py-2 text-sm border border-transparent hover:border-[#a717eb] transition-colors duration-300"
                    >
                        + Novo Produto
                    </Link>
                </div>

                {!isLoading && produtos.length === 0 && (
                    <p className="text-gray-500 text-center py-8">Nenhum produto cadastrado ainda.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-3">
                    <CardProduto produtos={produtos} loading={isLoading} />
                </div>
            </>
        </div>
    )
}

export default ListarProdutos;