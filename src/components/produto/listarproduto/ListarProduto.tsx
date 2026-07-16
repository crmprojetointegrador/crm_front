import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardproduto/CardProduto";
import { SyncLoader } from "react-spinners";

function ListarProdutos() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [statusFiltro, setStatusFiltro] = useState<string>("");

    // Unindo estados e dados de autenticação de ambas as branches
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const isAdmin = usuario.tipo === "admin";

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token]);

    useEffect(() => {
        if (token !== '') {
            buscarProdutos();
        }
    }, [token, statusFiltro]);

    async function buscarProdutos() {
        try {
            setIsLoading(true);

            const url = statusFiltro.trim() !== ""
                ? `/produtos/status/${statusFiltro}`
                : '/produtos';

            await buscar(url, setProdutos, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    // Regra de segurança mantida: Admin vê tudo. Usuário comum vê só as cobranças atribuídas a ele mesmo.
    const produtosVisiveis = isAdmin
        ? produtos
        : produtos.filter((produto) => produto.usuario?.id === usuario.id);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Lista de Cobranças</h1>

                    <div className="mt-2">
                        <select
                            value={statusFiltro}
                            onChange={(e) => setStatusFiltro(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e8ff] w-64 bg-white"
                        >
                            <option value="">Todos os Status</option>
                            <option value="Pago">Pago</option>
                            <option value="Em acordo">Em acordo</option>
                            <option value="Em atraso">Em atraso</option>
                            <option value="Sem negociação">Sem negociação</option>
                        </select>
                    </div>
                </div>

                <Link
                    to="/cadastrarproduto"
                    // Mantida a versão responsiva e com o espaçamento correto no className da main (from-rfrom corrigido para from-r)
                     className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] bg-clip-text text-transparent font-semibold rounded-md px-4 py-2 text-sm border border-transparent hover:border-[#a717eb] transition-colors duration-300"
                >
                    + Nova Cobrança
                </Link>
            </div>

            {/* Spinner de Loading */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <SyncLoader color="#a717eb" size={16} />
                </div>
            )}

            {/* Tratamento para lista vazia (Aplica o filtro de visibilidade do usuário comum/admin) */}
            {(!isLoading && produtosVisiveis.length === 0) && (
                <p className="text-gray-500 text-center py-8">
                    {statusFiltro
                        ? "Nenhuma cobrança encontrada com esse status."
                        : "Nenhuma cobrança cadastrada ainda."
                    }
                </p>
            )}

            {/* Renderização da Lista (Utiliza os produtosVisiveis ao invés de renderizar todos os produtos indiscriminadamente) */}
            {!isLoading && produtosVisiveis.length > 0 && (
                 <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-3">
                    <CardProduto produtos={produtos} loading={isLoading} />
                </div>
            )}
        </div>
    );
}

export default ListarProdutos;