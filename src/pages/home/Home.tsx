import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
function Home() {
  const { usuario } = useContext(AuthContext);
  return (

    <div
      className="relative flex justify-center min-h-[calc(100vh-64px)]"
      style={{
        background: 'linear-gradient(to right, #a717eb, #00e8ff)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full max-w-7xl px-8 py-16 gap-12 text-white">
        <div className="flex flex-col gap-6">
          <span className="inline-block w-fit text-xs font-semibold uppercase tracking-[0.2em] text-white border border-white/30 rounded-full px-4 py-1.5">
            CRM de Cobrança
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Olá {usuario?.nome || ""},<br />
            <span className="bg-gradient-to-r from-white to-[#00e8ff] bg-clip-text text-transparent">
              bem-vindo ao
            </span><br />
            InteliCob
          </h1>
          <p className="text-lg text-white/85 max-w-md">
            Onde organizar as finanças é simples e rápido.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/cadastrarproduto"
              className="rounded-md text-white font-semibold border border-white/30 px-6 py-3 hover:bg-white hover:text-[#7a12b0] transition-colors"
            >
              Nova Cobrança
            </Link>
            <Link
              to="/produtos"
              className="rounded-md border border-white/30 text-white font-medium px-6 py-3 hover:bg-white/10 transition-colors"
            >
              Ver Cobranças
            </Link>
          </div>
          <div className="flex gap-8 pt-8 border-t border-white/20 mt-4">
            <div>
              <p className="text-2xl font-bold text-white">+80%</p>
              <p className="text-sm text-white/70">Eficiência na recuperação</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-sm text-white/70">Organização digital</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="100%" height="100%">
            <defs>
              <linearGradient id="intelio-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#a717eb" />
                <stop offset="100%" stop-color="#00e8ff" />
              </linearGradient>
            </defs>

            <g transform="translate(15, 10)">
              <path d="M40 100 A 45 45 0 1 1 115 135" stroke="#a717eb" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.4" />
              <path d="M125 90 A 45 45 0 0 1 70 145" stroke="#00e8ff" stroke-width="12" stroke-linecap="round" fill="none" />

              <path d="M65 65 L95 95 L140 50 M140 50 H115 M140 50 V75"
                stroke="url(#intelio-grad)"
                stroke-width="10"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none" />
            </g>

            <text x="210" y="112" font-family="'Segoe UI', Roboto, Helvetica, sans-serif" font-size="56" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">
              Inteli<tspan fill="#00e8ff">Cob</tspan>
            </text>

            <text x="214" y="145" font-family="'Segoe UI', Roboto, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#a717eb" letter-spacing="4.5">
              ORGANIZAÇÃO INTELIGENTE DE ATIVOS
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
export default Home;