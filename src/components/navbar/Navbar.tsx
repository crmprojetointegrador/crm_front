import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Navbar() {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function fecharAoClicarFora(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuAberto(false);
            }
        }

        document.addEventListener("mousedown", fecharAoClicarFora);
        return () => document.removeEventListener("mousedown", fecharAoClicarFora);
    }, []);

    function logout() {
        setMenuAberto(false);
        handleLogout();
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate("/");
    }

    function irPara(caminho: string) {
        setMenuAberto(false);
        navigate(caminho);
    }

    return (
        <div className=" w-full bg-gradient-to-r from-[#a717eb] to-[#00e8ff] flex-col items-center px-8 py-4">
            <h1 className="text-white text-2xl font-bold"></h1>

            <div className="w-full flex justify-between">
                <Link to='/home' className="text-5xl font-bold">InteliCob</Link>

                <div className='flex gap-6 items-center'>
                    <Link to='/categorias' className='hover:underline'>Categorias</Link>

                    <Link to='/produtos' className='hover:underline'>Cobranças</Link>

                    <Link to='/about' className='hover:underline'>Sobre nós</Link>

                    {usuario.token !== "" ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuAberto((aberto) => !aberto)}
                                className="text-sm hover:underline flex items-center gap-1 cursor-pointer"
                            >
                                Olá, {usuario.nome}
                                <span className={`text-xs transition-transform ${menuAberto ? "rotate-180" : ""}`}>▾</span>
                            </button>

                            {menuAberto && (
                                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-20 text-gray-800">
                                    <button
                                        onClick={() => irPara('/editarperfil')}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-purple-50 cursor-pointer"
                                    >
                                        Editar perfil
                                    </button>
                                    <button
                                        onClick={() => irPara('/deletarperfil')}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                    >
                                        Deletar conta
                                    </button>
                                    <div className="border-t border-gray-100" />
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                                    >
                                        Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to='/login' className='hover:underline'>Login</Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar