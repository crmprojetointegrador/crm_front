import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiMenu, FiX } from "react-icons/fi"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Navbar() {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    const [menuAberto, setMenuAberto] = useState(false);
    const [menuMobileAberto, setMenuMobileAberto] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const token = usuario.token

    const isAdmin = usuario.tipo?.toLowerCase() === "admin";

    useEffect(() => {
        function fecharAoClicarFora(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuAberto(false);
            }
        }

        document.addEventListener("mousedown", fecharAoClicarFora);
        return () => document.removeEventListener("mousedown", fecharAoClicarFora);
    }, []);

    // Trava o scroll da página por trás enquanto o menu mobile está sobreposto
    useEffect(() => {
        document.body.style.overflow = menuMobileAberto ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuMobileAberto]);

    function logout() {
        setMenuAberto(false);
        setMenuMobileAberto(false);
        handleLogout();
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate("/");
    }

    function irPara(caminho: string) {
        setMenuAberto(false);
        setMenuMobileAberto(false);
        navigate(caminho);
    }

    return (
        <div className="relative w-full bg-gradient-to-r from-[#a717eb] to-[#00e8ff] flex-col items-center px-4 sm:px-8 py-4">
            <h1 className="text-white text-2xl font-bold"></h1>

            <div className="w-full flex justify-between items-center">
                <Link to='/home'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" className="h-11 sm:h-16 w-auto">
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
                            ORGANIZAÇÃO INTELIGENTE DE ATIVOS
                        </text>
                    </svg>
                </Link>

                {/* Links normais — só aparecem a partir de telas médias (tablet/desktop) */}
                <div className='hidden md:flex gap-6 items-center'>

                    {usuario.token !== "" ? (
                        <>
                            <Link to='/categorias' className='hover:underline text-fuchsia-950'>Categorias</Link>
                            <Link to='/produtos' className='hover:underline text-fuchsia-950'>Cobranças</Link>
                        </>
                    ) : null}

                    {isAdmin && (
                        <Link to='/usuarios' className='hover:underline text-fuchsia-950'>Usuários</Link>
                    )}

                    <Link to='/about' className='hover:underline text-fuchsia-950'>Sobre nós</Link>

                    {usuario.token !== "" ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuAberto((aberto) => !aberto)}
                                className="text-sm hover:underline flex items-center gap-1 cursor-pointer text-fuchsia-950"
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
                        <Link to='/login' className='hover:underline text-fuchsia-950'>Login</Link>
                    )}
                </div>

                {/* Botão hambúrguer — só aparece em telas pequenas */}
                <button
                    onClick={() => setMenuMobileAberto(true)}
                    className="md:hidden text-white p-1"
                    aria-label="Abrir menu"
                >
                    <FiMenu size={28} />
                </button>
            </div>

            {menuMobileAberto && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMenuMobileAberto(false)}
                    />

                    <div className="absolute right-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-xl flex flex-col">
                        <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-[#a717eb] to-[#00e8ff]">
                            <span className="text-white font-semibold">
                                {usuario.token !== "" ? `Olá, ${usuario.nome}` : "Menu"}
                            </span>
                            <button
                                onClick={() => setMenuMobileAberto(false)}
                                className="text-white p-1"
                                aria-label="Fechar menu"
                            >
                                <FiX size={26} />
                            </button>
                        </div>

                        <nav className="flex flex-col py-2 overflow-y-auto">
                            {usuario.token !== "" ? (
                                <>
                                    <button onClick={() => irPara('/categorias')} className="text-left px-5 py-3 text-gray-800 hover:bg-purple-50 border-b border-gray-100">
                                        Categorias
                                    </button>
                                    <button onClick={() => irPara('/produtos')} className="text-left px-5 py-3 text-gray-800 hover:bg-purple-50 border-b border-gray-100">
                                        Cobranças
                                    </button>
                                </>
                            ) : null}

                            {isAdmin && (
                                <button onClick={() => irPara('/usuarios')} className="text-left px-5 py-3 text-gray-800 hover:bg-purple-50 border-b border-gray-100">
                                    Usuários
                                </button>
                            )}

                            <button onClick={() => irPara('/about')} className="text-left px-5 py-3 text-gray-800 hover:bg-purple-50 border-b border-gray-100">
                                Sobre nós
                            </button>

                            {usuario.token !== "" ? (
                                <>
                                    <button onClick={() => irPara('/editarperfil')} className="text-left px-5 py-3 text-gray-800 hover:bg-purple-50 border-b border-gray-100">
                                        Editar perfil
                                    </button>
                                    <button onClick={() => irPara('/deletarperfil')} className="text-left px-5 py-3 text-red-600 hover:bg-red-50 border-b border-gray-100">
                                        Deletar conta
                                    </button>
                                    <button onClick={logout} className="text-left px-5 py-3 text-gray-800 hover:bg-gray-50 font-medium">
                                        Sair
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => irPara('/login')} className="text-left px-5 py-3 text-gray-800 hover:bg-purple-50 font-medium">
                                    Login
                                </button>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar