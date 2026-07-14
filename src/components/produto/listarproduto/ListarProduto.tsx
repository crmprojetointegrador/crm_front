import { useQuery } from "@tanstack/react-query";
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
        return (
            <div className="flex justify-center items-center py-16">
                <p className="text-red-600">
                    Não foi possível carregar as cobranças. Tente novamente em instantes.
                    {error instanceof Error && (
                        <span className="block text-sm text-gray-400 mt-1">{error.message}</span>
                    )}
                </p>
            </div>
        );
    }

    if (!produtos || produtos.length === 0) {
        return (
            <div className="flex justify-center items-center py-16">
                <p className="text-gray-500">Nenhuma cobrança cadastrada ainda.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">

            <h1 className="text-2xl font-bold mb-6">Lista de Cobranças</h1>

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
