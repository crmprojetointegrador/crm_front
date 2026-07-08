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
            gap: "1rem",
            alignContent: "center",
            justifyContent: "center",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            paddingLeft: "1rem",
          }}
          >
            <h2 style={{
              fontSize: "3rem",
              fontWeight: "bold",
            }}
            >
              Bem-Vindo
            </h2>

            <p style={{
              fontSize: "1.25rem"
            }}
            >
              Onde organizar as finanças é simples e rápido.
            </p>

            <div style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "1rem"
            }}
            >
              <div style={{
                borderRadius: "0.5rem",
                color: "white",
                border: "2px solid white",
                padding: "0.5rem 1.5rem",
                cursor: "pointer"
              }}
              >
                Novo Debito
              </div>
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem"
          }}
          >
            <img src="https://ik.imagekit.io/bruumendes/ideia_logo.svg?updatedAt=1783529609749"
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