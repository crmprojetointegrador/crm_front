import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiEye, FiEyeOff } from "react-icons/fi";
import type { Usuario } from "../../../models/Usuario";
import type { Produto } from "../../../models/Produto";

interface CardUsuarioProps {
  usuarios: Usuario[];
  produtos: Produto[];
  loading: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  "Pago": "bg-green-100 text-green-700",
  "Em acordo": "bg-blue-100 text-blue-700",
  "Em atraso": "bg-red-100 text-red-700",
  "Sem negociação": "bg-gray-100 text-gray-700",
};


function CardUsuario({ usuarios, produtos, loading }: CardUsuarioProps) {
  const linhasLoading = Array.from({ length: 5 });
  const [expandidoId, setExpandidoId] = useState<number | null>(null);
  const [cpfVisivel, setCpfVisivel] = useState<number | null>(null);

  function formatarData(data: string) {
    if (!data) return "-";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function formatarCpfOculto(cpf: string) {
    if (!cpf || cpf.length !== 11) return cpf;
    return `${cpf.slice(0, 3)}.***.***-${cpf.slice(-2)}`;
  }

  function alternarCpfVisivel(id: number) {
    setCpfVisivel((atual) => (atual === id ? null : id));
  }

  function formatarCpfCompleto(cpf: string) {
    if (!cpf || cpf.length !== 11) return cpf;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  function alternarExpandido(id: number) {
    setExpandidoId((atual) => {
      if (atual === id) {
        return null;
      } else {
        setCpfVisivel(null);
        return id; 
      }
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#a717eb]/20 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-[#faf5ff] border-b-2 border-[#a717eb]">
            <th className="py-3 px-6 font-semibold text-sm tracking-wide uppercase text-[#7a12b0]">Nome</th>
            <th className="py-3 px-6 font-semibold text-sm tracking-wide uppercase text-[#7a12b0]">E-mail</th>
            <th className="py-3 pl-2 pr-6 font-semibold text-sm tracking-wide uppercase text-center w-10"></th>
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
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </td>
                <td className="py-3 pl-2 pr-6 text-center">
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse mx-auto" />
                </td>
              </tr>
            ))
          ) : (
            usuarios.map((usuario) => {
              const expandido = expandidoId === usuario.id;
              const cobrancasDoUsuario = produtos.filter((p) => p.usuario?.id === usuario.id);

              return (
                <>
                  <tr
                    key={usuario.id}
                    onClick={() => alternarExpandido(usuario.id)}
                    className="border-t border-gray-100 hover:bg-[#faf5ff] transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-6 text-base font-medium text-gray-800">
                      {usuario.nome}
                    </td>
                    <td className="py-3 px-6 text-base text-gray-500">
                      {usuario.email}
                    </td>
                    <td className="py-3 pl-2 pr-6 text-center text-gray-400">
                      {expandido ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                    </td>
                  </tr>

                  {expandido && (
                    <tr key={`${usuario.id}-detalhe`} className="bg-[#faf5ff]/60 border-t border-gray-100">
                      <td colSpan={3} className="py-4 px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-4">
                          <div>
                            <span className="block text-gray-500 text-xs uppercase tracking-wide">CPF</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-800">
                                {cpfVisivel ? formatarCpfCompleto(usuario.cpf) : formatarCpfOculto(usuario.cpf)}
                              </span>
                              <button
                                type="button"
                                onClick={() => alternarCpfVisivel(usuario.id)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                {cpfVisivel === usuario.id ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <span className="block text-gray-500 text-xs uppercase tracking-wide">Data de nascimento</span>
                            <span className="text-gray-800">{formatarData(usuario.dataNascimento)}</span>
                          </div>
                          <div>
                            <span className="block text-gray-500 text-xs uppercase tracking-wide">Tipo</span>
                            <span className="text-gray-800">{usuario.tipo}</span>
                          </div>
                        </div>

                        <span className="block text-gray-500 text-xs uppercase tracking-wide mb-2">
                          Cobranças cadastradas ({cobrancasDoUsuario.length})
                        </span>

                        {cobrancasDoUsuario.length === 0 ? (
                          <p className="text-sm text-gray-400">Nenhuma cobrança atribuída a este usuário.</p>
                        ) : (
                          <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                            <table className="w-full text-left text-sm">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                  <th className="py-2 px-4 font-medium text-gray-500">Nome</th>
                                  <th className="py-2 px-4 font-medium text-gray-500">Valor</th>
                                  <th className="py-2 px-4 font-medium text-gray-500">Status</th>
                                  <th className="py-2 px-4 font-medium text-gray-500">Categoria</th>
                                  <th className="py-2 px-4 font-medium text-gray-500">Data</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cobrancasDoUsuario.map((cobranca) => (
                                  <tr key={cobranca.id} className="border-t border-gray-100">
                                    <td className="py-2 px-4 text-gray-800">{cobranca.nome}</td>
                                    <td className="py-2 px-4 text-gray-600">
                                      R$ {cobranca.valorDebito.toFixed(2)}
                                    </td>
                                    <td className="py-2 px-4">
                                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[cobranca.status] ?? "bg-gray-100 text-gray-700"
                                        }`}>
                                        {cobranca.status}
                                      </span>
                                    </td>
                                    <td className="py-2 px-4 text-gray-600">
                                      {cobranca.categoria?.nome || "Sem categoria"}
                                    </td>
                                    <td className="py-2 px-4 text-gray-600">
                                      {formatarData(cobranca.dataDebito)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CardUsuario;