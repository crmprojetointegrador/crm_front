import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type { UsuarioLogin } from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <div className="flex justify-center items-center py-16 px-4">
            <form className="flex justify-center items-center flex-col w-full max-w-sm gap-4"
                onSubmit={login}>

                <h2 className="text-slate-900 text-3xl font-bold">Entrar</h2>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF</label>
                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        placeholder="CPF"
                        autoComplete="username"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={usuarioLogin.cpf}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col w-full gap-1 relative">
                    <label htmlFor="senha" className="text-sm font-medium text-gray-700">Senha</label>
                    <div className="relative">
                        <input
                            type={senhaVisivel ? "text" : "password"}
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            autoComplete="current-password"
                            className="border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                        <button
                            type="button"
                            onClick={() => setSenhaVisivel(!senhaVisivel)}
                            className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {senhaVisivel ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                </div>

                <button
                    type='submit'
                    className="rounded-md bg-gradient-to-r from-[#a717eb] to-[#00e8ff] flex justify-center hover:opacity-90 text-white w-full py-2">
                    {isLoading ?
                        <ClipLoader
                            color="#ffffff"
                            size={24}
                        /> :
                        <span>Entrar</span>
                    }
                </button>

                <hr className="border-slate-300 w-full" />

                <p className="text-sm text-gray-600">
                    Ainda não tem uma conta?{' '}
                    <Link to="/cadastro" className="text-purple-700 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
