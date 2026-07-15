import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Navbar() {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate("/");
    }

    return (
        <div className=" w-full bg-gradient-to-r from-[#a717eb] to-[#00e8ff] flex-col items-center px-8 py-4">
            <h1 className="text-white text-2xl font-bold"></h1>

            <div className="w-full flex justify-between">
                <Link to='/home' className="text-5xl font-bold">InteliCob</Link>

                <div className='flex gap-6 items-center'>
                    <Link to='/produtos' className='hover:underline'>Produto</Link>

                    {usuario.token !== "" ? (
                        <>
                            <span className="text-sm">Olá, {usuario.nome}</span>
                            <button onClick={logout} className='hover:underline cursor-pointer'>
                                Sair
                            </button>
                        </>
                    ) : (
                        <Link to='/login' className='hover:underline'>Login</Link>
                    )}

                    <Link to='/about' className='hover:underline'>Sobre nós</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
