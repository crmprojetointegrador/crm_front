import { Link } from 'react-router-dom'
import type { Produto } from '../../../models/Produto'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

interface CardProdutoProps {
    produtos: Produto[]
    loading: boolean
}

function CardProduto({ produtos, loading }: CardProdutoProps) {
    const linhasLoading = Array.from({ length: 5 })

    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#a717eb]/20 overflow-hidden">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-[#faf5ff] border-b-2 border-[#a717eb]">
                        <th className="py-3 px-6 font-semibold text-sm tracking-wide uppercase text-[#7a12b0]">Nome</th>
                        <th className="py-3 px-6 font-semibold text-sm tracking-wide uppercase text-[#7a12b0]">Valor</th>
                        <th className="py-3 px-6 font-semibold text-sm tracking-wide uppercase text-[#7a12b0]">Status</th>
                        <th className="py-3 px-6 font-semibold text-sm tracking-wide uppercase text-[#7a12b0]">Categoria</th>
                        <th className="py-3 pl-2 pr-1 font-semibold text-sm tracking-wide uppercase text-center w-10"></th>
                        <th className="py-3 pl-1 pr-6 font-semibold text-sm tracking-wide uppercase text-center w-10"></th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        linhasLoading.map((_, index) => (
                            <tr key={index} className="border-t border-gray-100">
                                <td className="py-3 px-6">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                                </td>
                                <td className="py-3 px-6">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                                </td>
                                <td className="py-3 px-6">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                                </td>
                                <td className="py-3 px-6">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
                                </td>
                                <td className="py-3 pl-2 pr-1 text-center">
                                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse mx-auto" />
                                </td>
                                <td className="py-3 pl-1 pr-6 text-center">
                                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse mx-auto" />
                                </td>
                            </tr>
                        ))
                    ) : (
                        produtos.map((produto) => (
                            <tr
                                key={produto.id}
                                className="border-t border-gray-100 hover:bg-[#faf5ff] transition-colors"
                            >
                                <td className="py-3 px-6 text-base font-medium text-gray-800">
                                    {produto.nome}
                                </td>
                                <td className="py-3 px-6 text-base text-gray-500">
                                    R$ {produto.valorDebito.toFixed(2)}
                                </td>
                                <td className="py-3 px-6 text-base">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                        produto.status === 'Pago' ? 'bg-green-100 text-green-700' :
                                        produto.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' :
                                        produto.status === 'Atrasado' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {produto.status}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-base text-gray-500">
                                    {produto.categoria?.nome || 'Sem categoria'}
                                </td>
                                <td className="py-3 pl-2 pr-1 text-center">
                                    <Link
                                        to={`/editarproduto/${produto.id}`}
                                        className="inline-flex items-center justify-center text-[#00b8cc] hover:underline p-1"
                                    >
                                        <FiEdit2 size={18} />
                                    </Link>
                                </td>
                                <td className="py-3 pl-1 pr-6 text-center">
                                    <Link
                                        to={`/deletarproduto/${produto.id}`}
                                        className="inline-flex items-center justify-center text-red-500 hover:underline p-1"
                                    >
                                        <FiTrash2 size={18} />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CardProduto