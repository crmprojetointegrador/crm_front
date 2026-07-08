import { useState } from "react";
import type { Produto } from "../../../models/Produto";
import CardProduto from "../cardproduto/CardProduto";

function ListarProdutos() {

    const [produtos] = useState<Produto[]>([
        {
            id: 1,
            nome: "Mensalidade Cliente Empresa Alfa",
            valorDebito: 850.00,
            dataDebito: "05/07/2026",
            status: "Pendente",
            categoria: null,
            usuario: null
        },
        {
            id: 2,
            nome: "Serviço de Consultoria - Cliente Beta",
            valorDebito: 1200.00,
            dataDebito: "10/07/2026",
            status: "Pago",
            categoria: null,
            usuario: null
        },
        {
            id: 3,
            nome: "Plano Corporativo Cliente Gamma",
            valorDebito: 450.00,
            dataDebito: "15/07/2026",
            status: "Atrasado",
            categoria: null,
            usuario: null
        }
    ]);

    return (

        <div>

            <h1>Lista de Cobranças</h1>

            <div>

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