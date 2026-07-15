import { Navigate } from "react-router-dom";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface RotaProtegidaProps {
    children: ReactNode;
}

function RotaProtegida({ children }: RotaProtegidaProps) {
    const { usuario } = useContext(AuthContext);

    if (usuario.token === "") {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default RotaProtegida;
