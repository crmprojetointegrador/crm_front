import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Usuario } from "../../../models/Usuario";
import { buscar } from "../../../services/Service";
import CardUsuario from "../cardusuario/CardUsuario";

function ListarUsuarios() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState<string>("");

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

  const termo = busca.trim().toLowerCase();

  // Só usuários comuns (tipo "user"), nunca admins, nessa lista
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
          <p className="text-sm text-gray-500 mt-1">Clique em um nome para ver os dados completos.</p>
        </div>

        <input
          type="text"
          placeholder="Buscar por nome ou CPF..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#00e8ff] bg-white"
        />
      </div>

      {(!isLoading && usuariosVisiveis.length === 0) && (
        <p className="text-gray-500 text-center py-8">
          {busca ? "Nenhum usuário encontrado com esse termo." : "Nenhum usuário cadastrado ainda."}
        </p>
      )}

      {(isLoading || usuariosVisiveis.length > 0) && (
        <CardUsuario usuarios={usuariosVisiveis} loading={isLoading} />
      )}
    </div>
  );
}

export default ListarUsuarios;