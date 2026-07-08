import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListarProdutos from "./components/produto/listarproduto/ListarProduto";
import FormProduto from "./components/produto/formproduto/FormProduto";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Página inicial */}
        <Route
          path="/"
          element={<ListarProdutos />}
        />


        {/* Lista de produtos */}
        <Route
          path="/produtos"
          element={<ListarProdutos />}
        />


        {/* Cadastro de produto */}
        <Route
          path="/cadastrarproduto"
          element={<FormProduto />}
        />


        {/* Editar produto */}
        <Route
          path="/editarproduto/:id"
          element={<FormProduto />}
        />


        {/* Deletar produto */}
        <Route
          path="/deletarproduto/:id"
          element={<DeletarProduto />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;