import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import type { Categoria } from "../../../models/Categoria";
import CardCategoria from "../cardcategoria/CardCategoria";


function ListaCategorias() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [categorias, setCategorias] = useState<Categoria[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarCategorias()
    }, [categorias.length])

    async function buscarCategorias() {
        try {

            setIsLoading(true)

            await buscar('/categorias', setCategorias, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Categorias</h1>
                        <Link
                            to="/cadastrarcategoria"
                            className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] bg-clip-text text-transparent font-semibold rounded-md px-4 py-2 text-sm border border-transparent hover:border-[#a717eb] transition-colors duration-300"
                        >
                            + Nova Categoria
                        </Link>
                    </div>
    
                    {!isLoading && categorias.length === 0 && (
                        <p className="text-gray-500 text-center py-8">Nenhuma categoria cadastrada ainda.</p>
                    )}
    
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-3">
                        <CardCategoria categorias={categorias} loading={isLoading} />
                    </div>
                </>
        </div>
    )
}

export default ListaCategorias;