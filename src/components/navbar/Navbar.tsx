import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Navbar() {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const token = usuario.token

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
                <Link to='/home'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" className="h-16 w-auto">
                        <defs>
                            <linearGradient id="intelio-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FFFFFF" />
                                <stop offset="100%" stopColor="#00e8ff" />
                            </linearGradient>
                        </defs>

                        <g transform="translate(15, 10)">
                            <path d="M40 100 A 45 45 0 1 1 115 135" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.4" />
                            <path d="M125 90 A 45 45 0 0 1 70 145" stroke="#00e8ff" strokeWidth="12" strokeLinecap="round" fill="none" />
                            <path d="M65 65 L95 95 L140 50 M140 50 H115 M140 50 V75"
                                stroke="url(#intelio-grad)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none" />
                        </g>

                        <text x="210" y="112" fontFamily="'Segoe UI', Roboto, Helvetica, sans-serif" fontSize="56" fontWeight="900" fill="#FFFFFF" letterSpacing="-0.5">
                            Inteli<tspan fill="#00e8ff">Cob</tspan>
                        </text>

                        <text x="214" y="145" fontFamily="'Segoe UI', Roboto, Helvetica, sans-serif" fontSize="14" fontWeight="700" fill="#FFFFFF" letterSpacing="4.5" opacity="0.9">
                            ORGANIZAÇÃO INTELIGENTE DE PASSIVOS
                        </text>
                    </svg>
                </Link>

                <div className='flex gap-6 items-center'>

                    {usuario.token !== "" ? (
                      <>
                        <Link to='/categorias' className='hover:underline text-white'>Categorias</Link>
                        <Link to='/produtos' className='hover:underline text-white'>Cobranças</Link>
                      </>
                    ) : null}

                    <Link to='/about' className='hover:underline text-white'>Sobre nós</Link>

                    {usuario.token !== "" ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuAberto((aberto) => !aberto)}
                                className="text-sm hover:underline flex items-center gap-1 cursor-pointer text-white"
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
                        <Link to='/login' className='hover:underline text-white'>Login</Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar