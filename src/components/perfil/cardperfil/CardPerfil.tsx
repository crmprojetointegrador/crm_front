import { Link } from "react-router-dom";
import type { Usuario } from "../../../models/Usuario";

interface CardPerfilProps {
  perfil: Usuario;
}

function CardPerfil({ perfil }: CardPerfilProps) {

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col gap-3">

      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">{perfil.nome}</h2>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700 whitespace-nowrap">
          {perfil.tipo}
        </span>
      </div>

      <p className="text-gray-600">
        <strong>CPF:</strong> {perfil.cpf}
      </p>

      <p className="text-gray-600">
        <strong>E-mail:</strong> {perfil.email}
      </p>

      <p className="text-gray-600">
        <strong>Data de nascimento:</strong> {perfil.dataNascimento}
      </p>

      <div className="flex gap-4 mt-2 pt-2 border-t border-gray-100">

        <Link to="/editarperfil" className="text-purple-700 hover:underline text-sm font-medium">
          Editar
        </Link>

        <Link to="/deletarperfil" className="text-red-600 hover:underline text-sm font-medium">
          Deletar conta
        </Link>

      </div>

    </div>
  );
}

export default CardPerfil;