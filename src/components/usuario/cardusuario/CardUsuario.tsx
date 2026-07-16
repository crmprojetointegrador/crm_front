import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { Usuario } from "../../../models/Usuario";

interface CardUsuarioProps {
  usuarios: Usuario[];
  loading: boolean;
}

function formatarData(data: string) {
  if (!data) return "-";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function formatarCpf(cpf: string) {
  if (!cpf || cpf.length !== 11) return cpf;
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function CardUsuario({ usuarios, loading }: CardUsuarioProps) {
  const linhasLoading = Array.from({ length: 5 });
  const [expandidoId, setExpandidoId] = useState<number | null>(null);

  function alternarExpandido(id: number) {
    setExpandidoId((atual) => (atual === id ? null : id));
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
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="block text-gray-500 text-xs uppercase tracking-wide">CPF</span>
                            <span className="text-gray-800">{formatarCpf(usuario.cpf)}</span>
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