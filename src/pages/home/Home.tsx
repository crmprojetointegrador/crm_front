import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="relative flex justify-center min-h-[calc(100vh-64px)]"
      style={{
        background: 'linear-gradient(to right, #a717eb, #00e8ff)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full max-w-7xl px-8 py-16 gap-12 text-white">

        <div className="flex flex-col gap-6">
          <span className="inline-block w-fit text-xs font-semibold uppercase tracking-[0.2em] text-white border border-white/40 rounded-full px-4 py-1.5">
            CRM de Cobrança
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Olá usuário,<br />
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
              className="rounded-md text-white font-semibold border-2 border-white px-6 py-3 hover:bg-white hover:text-[#7a12b0] transition-colors"
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
              <p className="text-2xl font-bold text-white">+30%</p>
              <p className="text-sm text-white/70">Eficiência na recuperação</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-sm text-white/70">Organização digital</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-4">
          <img
            src="https://ik.imagekit.io/bruumendes/gemini-svg%20(5).svg"
            alt="logo inicial para página home"
            className="w-[85%]"
          />
        </div>

      </div>
    </div>
  )
}

export default Home;