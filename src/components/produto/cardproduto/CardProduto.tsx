import { Link } from "react-router-dom";
import type { Produto } from "../../../models/Produto";

interface CardProdutoProps {
    produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {

    return (
        <div className="card-produto">

            <h2>{produto.nome}</h2>

            <p>
                <strong>Valor do Débito:</strong> R$ {produto.valorDebito.toFixed(2)}
            </p>

            <p>
                <strong>Data do Débito:</strong> {produto.dataDebito}
            </p>

            <p>
                <strong>Status:</strong> {produto.status}
            </p>

            {produto.categoria && (
                <p>
                    <strong>Categoria:</strong> {produto.categoria.nome}
                </p>
            )}

            <div>

                <Link to={`/editarproduto/${produto.id}`}>
                    Editar
                </Link>

                <Link to={`/deletarproduto/${produto.id}`}>
                    Deletar
                </Link>

            </div>

        </div>
    );
}

export default CardProduto;