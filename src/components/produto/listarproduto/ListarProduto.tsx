import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import ProdutoService from "../../../services/ProdutoService";
import CardProduto from "../cardproduto/CardProduto";

function ListarProdutos() {

    const { data: produtos, isLoading, isError, error } = useQuery({
        queryKey: ["produtos"],
        queryFn: async () => {
            const response = await ProdutoService.getAll();
            return response.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <p className="text-gray-500">Carregando cobranças...</p>
            </div>
        );
    }

    if (isError) {
        const sessaoExpirada = isAxiosError(error) && error.response?.status === 401;

        return (
            <div className="flex justify-center items-center py-16">
                <p className="text-red-600">
                    {sessaoExpirada
                        ? "Sua sessão expirou. Faça login novamente."
                        : "Não foi possível carregar as cobranças. Tente novamente em instantes."}
                </p>
            </div>
        );
    }

    if (!produtos || produtos.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Lista de Cobranças</h1>
                    <Link
                        to="/cadastrarproduto"
                        className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md px-4 py-2 text-sm"
                    >
                        + Nova Cobrança
                    </Link>
                </div>
                <p className="text-gray-500 text-center py-8">Nenhuma cobrança cadastrada ainda.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lista de Cobranças</h1>
                <Link
                    to="/cadastrarproduto"
                    className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md px-4 py-2 text-sm"
                >
                    + Nova Cobrança
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {produtos.map((produto) => (

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
