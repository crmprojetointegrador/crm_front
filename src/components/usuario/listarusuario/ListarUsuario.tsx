import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Usuario } from "../../../models/Usuario";
import type { Produto } from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardUsuario from "../cardusuario/CardUsuario";
import ModalCadastrarUsuario from "../cadastrarusuario/ModalCadastrarUsuario";

function ListarUsuarios() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [modalAberto, setModalAberto] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  //Pagina
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const ITENS_POR_PAGINA = 8;

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (token !== '') {
      buscarUsuarios();
      buscarProdutos();
    }
  }, [token]);

  async function buscarUsuarios() {
    try {
      setIsLoading(true);
      await buscar('/usuarios/all', setUsuarios, {
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

  async function buscarProdutos() {
    try {
      await buscar('/produtos', setProdutos, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
    }
  }
  //Pagina
  useEffect(() => {
    setPaginaAtual(1);
  }, [busca]);

  const termo = busca.trim().toLowerCase();

  const usuariosVisiveis = usuarios
    .filter((u) => u.tipo?.trim().toLowerCase() === "user")
    .filter((u) =>
      termo.length === 0 ||
      u.nome.toLowerCase().includes(termo) ||
      u.cpf?.toLowerCase().includes(termo)
    );

  //Pagina também

  const totalPaginas = Math.ceil(usuariosVisiveis.length / ITENS_POR_PAGINA);
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const usuariosPaginados = usuariosVisiveis.slice(inicio, fim);

  function irParaPagina(pagina: number) {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaAtual(pagina);
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Usuários</h1>
          <p className="text-sm text-gray-500 mt-1">Clique em um nome para ver os dados e as cobranças dele.</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1 md:w-64 focus:outline-none focus:ring-2 focus:ring-[#00e8ff] bg-white"
          />
          <button
            onClick={() => setModalAberto(true)}
            className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] bg-clip-text text-transparent font-semibold rounded-md px-4 py-2 text-sm border border-transparent hover:border-[#a717eb] transition-colors duration-300 whitespace-nowrap"
          >
            + Novo Usuário
          </button>
        </div>
      </div>

      {(!isLoading && usuariosVisiveis.length === 0) && (
        <p className="text-gray-500 text-center py-8">
          {busca ? "Nenhum usuário encontrado com esse termo." : "Nenhum usuário cadastrado ainda."}
        </p>
      )}
      {/*Paginando real*/}
      {(isLoading || usuariosPaginados.length > 0) && (
        <>
          <CardUsuario
            usuarios={usuariosPaginados}
            produtos={produtos}
            loading={isLoading}
          />

          {!isLoading && totalPaginas > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => irParaPagina(paginaAtual - 1)}
                disabled={paginaAtual === 1}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  paginaAtual === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Anterior
              </button>

              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                <button
                  key={pagina}
                  onClick={() => irParaPagina(pagina)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    pagina === paginaAtual
                      ? 'bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white'
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {pagina}
                </button>
              ))}

              <button
                onClick={() => irParaPagina(paginaAtual + 1)}
                disabled={paginaAtual === totalPaginas}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  paginaAtual === totalPaginas
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Próximo
              </button>
            </div>
          )}

          {!isLoading && usuariosVisiveis.length > 0 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Mostrando {usuariosPaginados.length} de {usuariosVisiveis.length} usuário(s)
            </p>
          )}
        </>
      )}

      <ModalCadastrarUsuario
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onCadastrado={buscarUsuarios}
      />
    </div>
  );
}

export default ListarUsuarios;