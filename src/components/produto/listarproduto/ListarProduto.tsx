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

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/login');
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
                    className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md px-4 py-2 text-sm self-stretch md:self-auto text-center"
                >
                    + Nova Cobrança
                </Link>
            </div>

            {
                isLoading && (
                    <div className="flex justify-center py-16">
                        <SyncLoader color="#a717eb" size={16} />
                    </div>
                )
            }

            {
                (!isLoading && produtos.length === 0) && (
                    <p className="text-gray-500 text-center py-8">
                        {statusFiltro
                            ? "Nenhuma cobrança encontrada com esse status."
                            : "Nenhuma cobrança cadastrada ainda."
                        }
                    </p>
                )
            }

            {
                !isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {produtos.map((produto) => (
                            <CardProduto
                                key={produto.id}
                                produto={produto}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    );

}

export default ListarProdutos;