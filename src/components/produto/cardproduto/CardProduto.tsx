import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";

interface CardProdutoProps {
    produto: Produto;
}

const statusStyles: Record<string, string> = {
    Pago: "bg-green-100 text-green-700",
    Pendente: "bg-yellow-100 text-yellow-700",
    Atrasado: "bg-red-100 text-red-700",
};

function CardProduto({ produto }: CardProdutoProps) {

    const { usuario } = useContext(AuthContext);
    const isAdmin = usuario.tipo === "admin";

    const badgeClass = statusStyles[produto.status] ?? "bg-gray-100 text-gray-700";

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col gap-2">

            <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800">{produto.nome}</h2>
                <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${badgeClass}`}>
                    {produto.status}
                </span>
            </div>

            <p className="text-gray-600">
                <strong>Valor do Débito:</strong> R$ {produto.valorDebito.toFixed(2)}
            </p>

            <p className="text-gray-600">
                <strong>Data do Débito:</strong> {produto.dataDebito}
            </p>

            {produto.categoria && (
                <p className="text-gray-600">
                    <strong>Categoria:</strong> {produto.categoria.nome}
                </p>
            )}

            {isAdmin && produto.usuario && (
                <p className="text-gray-500 text-sm">
                    <strong>Atribuído a:</strong> {produto.usuario.nome}
                </p>
            )}

            {isAdmin && (
                <div className="flex gap-4 mt-2 pt-2 border-t border-gray-100">

                    <Link to={`/editarproduto/${produto.id}`} className="text-purple-700 hover:underline text-sm font-medium">
                        Editar
                    </Link>

                    <Link to={`/deletarproduto/${produto.id}`} className="text-red-600 hover:underline text-sm font-medium">
                        Deletar
                    </Link>

                </div>
            )}

        </div>
    );
}

export default CardProduto;