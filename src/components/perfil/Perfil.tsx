import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type { Usuario } from "../../models/Usuario";
import { buscar } from "../../services/Service";
import { SyncLoader } from "react-spinners";
import CardPerfil from "../perfil/cardperfil/CardPerfil";

function Perfil() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dadosPerfil, setDadosPerfil] = useState<Usuario | null>(null)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    buscarPerfil()
  }, [])

  async function buscarPerfil() {
    try {
      setIsLoading(true)

      await buscar(`/usuarios/${usuario.id}`, setDadosPerfil, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">

      {isLoading && (
        <div className="flex justify-center py-16">
          <SyncLoader color="#a717eb" size={16} />
        </div>
      )}

      {!isLoading && dadosPerfil && (
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Meu Perfil</h1>
          <CardPerfil perfil={dadosPerfil} />
        </div>
      )}

    </div>
  );
}

export default Perfil;