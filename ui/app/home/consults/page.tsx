"use client"
import ButtonBack from '@/src/components/buttons/ButtonBack';
import { useState } from "react";
import Logo from '@/src/components/logo';
import { ButtonNew } from '@/src/components/buttons';



export default function consultPage() {
    const [idView, setIdView] = useState<number>(2)
    const [views, setViews] = useState<number[]>([1])

    function handleNewItem() {
        setViews([...views, idView]);
        setIdView(idView + 1);
    }

    return (

        <div className="flex flex-col item-center justify-center m-4 h-screen">

            {/*encabezado de la pagina */}
            <div>
                <div className='flex flex-col item-center justify-center'>
                    <Logo
                        width={30}
                        height={30}
                    >
                    </Logo>
                    <ButtonBack />
                </div>
            </div>

            {/* Formularios */}
            <div>
                {views.map(viewID => (
                    <QueryItem key={viewID} />
                ))}
            </div>


            <button
                type="button"
                onClick={handleNewItem}
                className=" bg-green-500 hover:bg-green-700 text-white w-14 h-10 
                    rounded focus:outline-none focus:shadow-outline
                    dark:shadow-slate-900 dark:shadow-lg shadow-zinc-700 shadow-md"
            >
                New
            </button>
        </div>
    )
}

function QueryItem() {
    const options = ["A", "B", "C"]
    const [option, setOption] = useState("A")

    return (
        <div className="flex flex-col bg-gray-700">
            <div className="flex flex-row">
                <select className="p-2 m-4 inline bg-red-700" value={option} onChange={e => setOption(e.target.value)}>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div className="p-2 m-4 flex flex-row bg-red-700 gap-4">
                {option == "A" && <p className="p-2 bg-orange-300">Elegiste la opcion A</p>}
                {option == "B" && <p className="p-2 bg-orange-300">Elegiste la opcion B</p>}
                {option == "C" && <p className="p-2 bg-orange-300">Elegiste la opcion C</p>}
                {/*<p className="p-2 bg-orange-300">Set first parameter</p>
					<p className="p-2 bg-orange-300">Set second parameter</p>
					<p className="p-2 bg-orange-300">Set third parameter</p>*/}
            </div>

            <div className="m-4 bg-yellow-700">

                <div className="flex flex-row">
                    <p className="p-2 m-4 bg-red-700">Exportar</p>
                </div>

                Graficos
            </div>
        </div>
    )
}