import { type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate();

    let component: ReactNode



    component = (

        <div className=" w-full bg-gradient-to-r from-[#a717eb] to-[#00e8ff] flex-col items-center px-8 py-4">
            <h1 className="text-white text-2xl font-bold"></h1>

            <div className="w-full flex justify-between">
                <Link to='/home' className="text-5xl font-bold">InteliCob</Link>

                <div className='flex gap-6 items-center'>
                    <Link to='/categorias' className='hover:underline'>Login</Link>
                    <Link to='/cadastrarcategoria' className='hover:underline'>Consultar Débito</Link>
                </div>
            </div>
        </div>

    )


    return (
        <>
            {component}
        </>
    )
}

export default Navbar