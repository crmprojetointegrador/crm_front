import { GithubLogoIcon } from "@phosphor-icons/react"
import { type ReactNode } from "react"


function Footer() {

    let data = new Date().getFullYear()




    let component: ReactNode



    component = (

        <div className="bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white flex justify-center text-center py-4">
            <div className="container flex flex-col items-center py-4">
                <p className='text-xl font-bold'>
                  {data}
                </p>
                <p className='text-lg'>Acesse o repositório do nosso projeto </p>
                <div className='flex gap-2'>

                <a href="https://github.com/crmprojetointegrador" target="_blank">
                    <GithubLogoIcon size={48} weight='bold' />
                </a>
            </div>
        </div>
        </div >

    )


    return (
        <>
            {component}
        </>
    )
}

export default Footer