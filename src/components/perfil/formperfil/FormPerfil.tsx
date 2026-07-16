import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Usuario } from "../../../models/Usuario";
import { atualizar, buscar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormPerfil() {

  const navigate = useNavigate();

  const [perfil, setPerfil] = useState<Usuario>({
    id: 0,
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    senha: '',
    tipo: ''
  })

  const [confirmarSenha, setConfirmarSenha] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [erro, setErro] = useState('')

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
      await buscar(`/usuarios/${usuario.id}`, (dados: Usuario) => {
        setPerfil({ ...dados, senha: '' })
      }, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  function retornar() {
    navigate('/perfil')
  }

  async function salvarPerfil(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')

    if (!perfil.nome || !perfil.cpf || !perfil.dataNascimento || !perfil.email) {
      setErro('Preencha todos os campos.')
      return
    }

    if (perfil.senha.length < 6 || perfil.senha !== confirmarSenha) {
      setErro('Digite e confirme uma senha válida (mínimo 6 caracteres) para salvar as alterações.')
      return
    }

    setIsLoading(true)

    try {
      await atualizar('/usuarios/atualizar', perfil, setPerfil, {
        headers: { Authorization: token }
      })
      alert('Perfil atualizado com sucesso!')
      retornar()
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        setErro('Não foi possível salvar as alterações. Confira os dados e tente novamente.')
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="flex justify-center items-center py-16 px-4">
      <form
        onSubmit={salvarPerfil}
        className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">Editar Perfil</h1>

        {erro && (
          <p className="text-sm text-red-600 text-center">{erro}</p>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome completo</label>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            value={perfil.nome}
            onChange={atualizarEstado}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF</label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={perfil.cpf}
            onChange={atualizarEstado}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700">Data de nascimento</label>
          <input
            id="dataNascimento"
            name="dataNascimento"
            type="date"
            autoComplete="bday"
            value={perfil.dataNascimento}
            onChange={atualizarEstado}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={perfil.email}
            onChange={atualizarEstado}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="senha" className="text-sm font-medium text-gray-700">Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            autoComplete="new-password"
            placeholder="Digite para confirmar as alterações"
            value={perfil.senha}
            onChange={atualizarEstado}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmarSenha" className="text-sm font-medium text-gray-700">Confirmar Senha</label>
          <input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            autoComplete="new-password"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={retornar}
            className="flex-1 border border-gray-300 text-gray-700 rounded-md py-2 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md py-2 flex justify-center disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ?
              <ClipLoader color="#ffffff" size={20} /> :
              <span>Salvar</span>
            }
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormPerfil;