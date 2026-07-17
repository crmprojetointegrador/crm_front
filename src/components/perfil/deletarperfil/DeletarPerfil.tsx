import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { ClipLoader } from "react-spinners"
import type { Produto } from "../../../models/Produto"

function DeletarPerfil() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [verificando, setVerificando] = useState<boolean>(true)
  const [cobrancasVinculadas, setCobrancasVinculadas] = useState<Produto[]>([])

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    verificarCobrancas()
  }, [])

  async function verificarCobrancas() {
    try {
      setVerificando(true)
      await buscar('/produtos', (produtos: Produto[]) => {
        const doUsuario = produtos.filter((p) => p.usuario?.id === usuario.id)
        setCobrancasVinculadas(doUsuario)
      }, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
        navigate('/login')
      }
    } finally {
      setVerificando(false)
    }
  }

  async function deletarConta() {
    // Trava de segurança: nunca deletar se houver cobranças vinculadas,
    if (cobrancasVinculadas.length > 0) {
      ToastAlerta('Não é possível excluir: há cobranças vinculadas a este usuário.', 'erro')
      return
    }

    setIsLoading(true)

    try {
      await deletar(`/usuarios/${usuario.id}`, {
        headers: { Authorization: token }
      })
      ToastAlerta('Conta apagada com sucesso!', 'info')
      handleLogout()
      navigate('/')
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
        navigate('/login')
      } else {
        ToastAlerta('Erro ao apagar a conta.', 'erro')
      }
    }

    setIsLoading(false)
  }

  function retornar() {
    navigate('/perfil')
  }

  const possuiCobrancas = cobrancasVinculadas.length > 0

  return (
    <div className='container w-full max-w-sm mx-auto py-16 px-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>Deletar Conta</h1>

      {verificando ? (
        <div className="flex justify-center py-6">
          <ClipLoader color="#a717eb" size={24} />
        </div>
      ) : possuiCobrancas ? (
        <p className='text-center text-red-600 mb-4'>
          Esta conta possui {cobrancasVinculadas.length} cobrança(s) vinculada(s) e não pode ser excluída.
          Remova ou transfira as cobranças pendentes antes de apagar a conta.
        </p>
      ) : (
        <p className='text-center text-gray-600 mb-4'>
          Tem certeza de que deseja apagar a sua conta? Essa ação não pode ser desfeita.
        </p>
      )}

      <div className='border border-gray-200 rounded-lg overflow-hidden flex flex-col'>
        <header className='py-2 px-4 bg-gradient-to-rfrom-[#a717eb] to-[#00e8ff] text-white font-bold'>
          {usuario.nome}
        </header>
        <div className="flex">
          <button
            className='text-white bg-gray-400 hover:bg-gray-500 w-full py-2'
            onClick={retornar}>
            Não
          </button>
          <button
            className='w-full text-white bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed flex items-center justify-center py-2'
            onClick={deletarConta}
            disabled={verificando || possuiCobrancas || isLoading}
            title={possuiCobrancas ? 'Existem cobranças vinculadas a este usuário' : undefined}
          >
            {isLoading ?
              <ClipLoader color="#ffffff" size={20} /> :
              <span>Sim</span>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarPerfil