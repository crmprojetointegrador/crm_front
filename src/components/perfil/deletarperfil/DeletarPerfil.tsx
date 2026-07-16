import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { ClipLoader } from "react-spinners"

function DeletarPerfil() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function deletarConta() {
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

  return (
    <div className='container w-full max-w-sm mx-auto py-16 px-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>Deletar Conta</h1>
      <p className='text-center text-gray-600 mb-4'>
        Tem certeza de que deseja apagar a sua conta? Essa ação não pode ser desfeita.
      </p>
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
            className='w-full text-white bg-red-500 hover:bg-red-600 flex items-center justify-center py-2'
            onClick={deletarConta}>
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