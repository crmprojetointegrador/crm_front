import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardproduto/CardProduto";
import { SyncLoader } from "react-spinners";

function ListarProdutos() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [produtos, setProdutos] = useState<Produto[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const isAdmin = usuario.tipo === "admin"

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        buscarProdutos()
    }, [])

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

    // Admin vê tudo. Usuário comum vê só as cobranças atribuídas a ele mesmo.
    const produtosVisiveis = isAdmin
        ? produtos
        : produtos.filter((produto) => produto.usuario?.id === usuario.id)

    return (
        <div className="container mx-auto px-4 py-8">

            {isLoading && (
                <div className="flex justify-center py-16">
                    <SyncLoader color="#a717eb" size={16} />
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lista de Cobranças</h1>
                <Link
                    to="/cadastrarproduto"
                    className="bg-gradient-to-rfrom-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md px-4 py-2 text-sm"
                >
                    + Nova Cobrança
                </Link>
            </div>

            {(!isLoading && produtosVisiveis.length === 0) && (
                <p className="text-gray-500 text-center py-8">Nenhuma cobrança cadastrada ainda.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {produtosVisiveis.map((produto) => (
                    <CardProduto
                        key={produto.id}
                        produto={produto}
                    />
                ))}
            </div>

        </div>
    );

}

export default ListarProdutos;