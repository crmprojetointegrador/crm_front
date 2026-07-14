import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

function Navbar() {

    const navigate = useNavigate();
    const { isAuthenticated, usuario, logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <div className=" w-full bg-gradient-to-r from-[#a717eb] to-[#00e8ff] flex-col items-center px-8 py-4">
            <h1 className="text-white text-2xl font-bold"></h1>

            <div className="w-full flex justify-between">
                <Link to='/home' className="text-5xl font-bold">InteliCob</Link>

                <div className='flex gap-6 items-center'>
                    <Link to='/produtos' className='hover:underline'>Produto</Link>

                    {isAuthenticated ? (
                        <>
                            <span className="text-sm">Olá, {usuario?.nome}</span>
                            <button onClick={handleLogout} className='hover:underline cursor-pointer'>
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
