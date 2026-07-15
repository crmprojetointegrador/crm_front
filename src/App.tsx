import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import About from './pages/About';
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

import ListarProdutos from "./components/produto/listarproduto/ListarProduto";
import FormProduto from "./components/produto/formproduto/FormProduto";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";

import RotaProtegida from "./routes/RotaProtegida";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />

        <div className="min-h-[80vh]">
          <Routes>

            <Route
              path="/"
              element={<Home />} />

            <Route
              path="/home" element={<Home />} />

            {/* Login */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* Cadastro de usuário */}
            <Route
              path="/cadastro"
              element={<Cadastro />}
            />

            {/* Sobre Nós */}
            <Route
              path="/about"
              element={<About />}
            />

            {/* Lista de produtos (autenticado) */}
            <Route
              path="/produtos"
              element={
                <RotaProtegida>
                  <ListarProdutos />
                </RotaProtegida>
              }
            />

            <Route
              path="/cadastrarproduto"
              element={
                <RotaProtegida>
                  <FormProduto />
                </RotaProtegida>
              }
            />

            <Route
              path="/editarproduto/:id"
              element={
                <RotaProtegida>
                  <FormProduto />
                </RotaProtegida>
              }
            />

            <Route
              path="/deletarproduto/:id"
              element={
                <RotaProtegida>
                  <DeletarProduto />
                </RotaProtegida>
              }
            />

          </Routes>
        </div>

        <Footer />

      </BrowserRouter>
    </>
  );
}

export default App;
