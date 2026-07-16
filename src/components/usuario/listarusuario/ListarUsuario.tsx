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

  const termo = busca.trim().toLowerCase();

  const usuariosVisiveis = usuarios
    .filter((u) => u.tipo?.trim().toLowerCase() === "user")
    .filter((u) =>
      termo.length === 0 ||
      u.nome.toLowerCase().includes(termo) ||
      u.cpf?.toLowerCase().includes(termo)
    );

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

      {(isLoading || usuariosVisiveis.length > 0) && (
        <CardUsuario usuarios={usuariosVisiveis} produtos={produtos} loading={isLoading} />
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
