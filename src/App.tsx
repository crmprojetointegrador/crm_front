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
import RotaAdmin from "./routes/RotaAdmin";
import ListaCategoria from "./components/categoria/listarcategoria/ListaCategoria";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";

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

            {/* Cadastrar cobrança (qualquer usuário logado) */}
            <Route
              path="/cadastrarproduto"
              element={
                <RotaProtegida>
                  <FormProduto />
                </RotaProtegida>
              }
            />

            {/* Editar cobrança (somente admin) */}
            <Route
              path="/editarproduto/:id"
              element={
                <RotaAdmin>
                  <FormProduto />
                </RotaAdmin>
              }
            />

            {/* Deletar cobrança (somente admin) */}
            <Route
              path="/deletarproduto/:id"
              element={
                <RotaAdmin>
                  <DeletarProduto />
                </RotaAdmin>
              }
            />

            {/* Lista de categorias (autenticado) */}
            <Route
              path="/categorias"
              element={
                <RotaProtegida>
                  <ListaCategoria />
                </RotaProtegida>
              }
            />

            {/* Cadastrar categoria (qualquer usuário logado) */}
            <Route
              path="/cadastrarcategoria"
              element={
                <RotaProtegida>
                  <FormCategoria />
                </RotaProtegida>
              }
            />

            {/* Deletar categoria (somente admin) */}
            <Route
              path="/deletarcategoria/:id"
              element={
                <RotaAdmin>
                  <DeletarCategoria />
                </RotaAdmin>
              }
            />

            {/* Editar categoria (somente admin) */}
            <Route
              path="/editarcategoria/:id"
              element={
                <RotaAdmin>
                  <FormCategoria />
                </RotaAdmin>
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