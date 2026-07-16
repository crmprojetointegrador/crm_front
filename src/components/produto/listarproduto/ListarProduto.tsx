import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";
import type { Categoria } from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardproduto/CardProduto";

function ListarProdutos() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [statusFiltro, setStatusFiltro] = useState<string>("");
    const [categoriaFiltro, setCategoriaFiltro] = useState<string>("");
    const [cpfFiltro, setCpfFiltro] = useState<string>("");
    const [userIdFiltro, setUserIdFiltro] = useState<string>("");

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const isAdmin = usuario.tipo?.trim().toLowerCase() === "admin";

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (token !== '') {
            buscarProdutos();
            buscarCategorias();
        }
    }, [token]);

    async function buscarProdutos() {
        try {
            setIsLoading(true);
            await buscar('/produtos', setProdutos, {
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

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            // Falha silenciosa se houver erro ao carregar categorias
        }
    }

    const produtosFiltrados = produtos.filter((produto) => {
        // Se não for admin, só exibe as cobranças do próprio usuário
        if (!isAdmin && produto.usuario?.id !== usuario.id) {
            return false;
        }

        // Filtro de Status
        const matchStatus = !statusFiltro || produto.status === statusFiltro;

        // Filtro de Categoria
        const matchCategoria = !categoriaFiltro || produto.categoria?.id === Number(categoriaFiltro);

        // Filtro de CPF (apenas para admin)
        const matchCpf = !isAdmin || !cpfFiltro ||
            (produto.usuario?.cpf && produto.usuario.cpf.replace(/\D/g, '').includes(cpfFiltro.replace(/\D/g, '')));

        // Filtro de ID do Usuário (apenas para admin)
        const matchUserId = !isAdmin || !userIdFiltro ||
            produto.usuario?.id === Number(userIdFiltro);

        return matchStatus && matchCategoria && matchCpf && matchUserId;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-3">Lista de Cobranças</h1>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                        {/* Filtro de Status */}
                        <select
                            value={statusFiltro}
                            onChange={(e) => setStatusFiltro(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e8ff] min-w-[150px] bg-white"
                        >
                            <option value="">Todos os Status</option>
                            <option value="Pago">Pago</option>
                            <option value="Em acordo">Em acordo</option>
                            <option value="Em atraso">Em atraso</option>
                            <option value="Sem negociação">Sem negociação</option>
                        </select>

                        {/* Filtro de Categoria */}
                        <select
                            value={categoriaFiltro}
                            onChange={(e) => setCategoriaFiltro(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e8ff] min-w-[150px] bg-white"
                        >
                            <option value="">Todas as Categorias</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nome}
                                </option>
                            ))}
                        </select>

                        {/* Filtros extras visíveis apenas para ADMIN */}
                        {isAdmin && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Buscar por CPF..."
                                    value={cpfFiltro}
                                    onChange={(e) => setCpfFiltro(e.target.value)}
                                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e8ff] w-44"
                                />

                                <input
                                    type="number"
                                    placeholder="Buscar por ID Usuário..."
                                    value={userIdFiltro}
                                    onChange={(e) => setUserIdFiltro(e.target.value)}
                                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e8ff] w-44"
                                />
                            </>
                        )}
                    </div>

                    <Link
                        to="/cadastrarproduto"
                        className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md px-4 py-2 text-sm self-stretch md:self-auto text-center"
                    >
                        + Nova Cobrança
                    </Link>
                </div>
            </div>

            {(!isLoading && produtosFiltrados.length === 0) && (
                <p className="text-gray-500 text-center py-8">
                    Nenhuma cobrança encontrada com os filtros selecionados.
                </p>
            )}

            {(isLoading || produtosFiltrados.length > 0) && (
                <div className="grid grid-cols-1 gap-4">
                    <CardProduto
                        produtos={produtosFiltrados}
                        loading={isLoading}
                    />
                </div>
            )}
        </div>
    );

}

export default ListarProdutos;