import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div style={{
        background: 'linear-gradient(to right, #a717eb, #00e8ff)',
        display: 'flex',
        justifyContent: 'center'
      }}
      >
        <div style={{
          display: "grid",
          gridTemplateColumns: '1fr 1fr',
          color: 'white',
          width: '100%',
          maxWidth: '1280px',
          paddingLeft: '2rem',
          paddingRight: '2rem',
        }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
          >
            <h2 style={{
              fontSize: "3rem",
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: "1.2"
            }}
            >
              Olá usuário,<br />

              <span style={{
                background: 'linear-gradient(to right, #ffffff, #00e8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                bem-vindo ao
              </span><br />

              <span style={{ color: "#ffffff" }}>InteliCob</span>
            </h2>

            <p style={{
              fontSize: "1.25rem",
              textAlign: "center"
            }}
            >
              Onde organizar as finanças é simples e rápido.
            </p>

            <div style={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}
            >
              <Link to="/cadastrarproduto" style={{
                borderRadius: "0.5rem",
                color: "white",
                border: "2px solid white",
                padding: "0.5rem 1.5rem",
                cursor: "pointer",
                textDecoration: "none",
              }}
              >
                Novo Débito
              </Link>
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem"
          }}
          >
            <img src="https://ik.imagekit.io/bruumendes/gemini-svg%20(5).svg"
              alt="logo inicial para página home"
              style={{
                width: "85%"
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;