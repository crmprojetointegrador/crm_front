import { Navigate } from "react-router-dom";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface RotaAdminProps {
  children: ReactNode;
}

function RotaAdmin({ children }: RotaAdminProps) {
  const { usuario } = useContext(AuthContext);

  if (usuario.token === "") {
    return <Navigate to="/login" replace />;
  }

  if (usuario.tipo !== "admin") {
    return <Navigate to="/produtos" replace />;
  }

  return <>{children}</>;
}

export default RotaAdmin;