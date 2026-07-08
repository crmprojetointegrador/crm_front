import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import About from './pages/About';

import ListarProdutos from "./components/produto/listarproduto/ListarProduto";
import FormProduto from "./components/produto/formproduto/FormProduto";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <div className="min-h-[80vh]">
          <Routes>

            <Route
              path="/"
              element={<Home />} />

            <Route
              path="/home" element={<Home />} />

            {/* Sobre Nós */}
            <Route
              path="/about"
              element={<About />}
            />

            {/* Lista de produtos */}
            <Route
              path="/produtos"
              element={<ListarProdutos />}
            />

            <Route
              path="/cadastrarproduto"
              element={<FormProduto />}
            />

            <Route
              path="/editarproduto/:id"
              element={<FormProduto />}
            />

            <Route
              path="/deletarproduto/:id"
              element={<DeletarProduto />}
            />

          </Routes>
        </div>

        <Footer />

      </BrowserRouter>
    </>
  );
}

export default App;