import { MouseEventHandler } from "react";
import BotonProps from "../models/botonPrps";

export function buttonNew(fun: MouseEventHandler<HTMLButtonElement> | undefined) {
    return (
        <button
            type="button"
            onClick={fun}
            className="bg-green-500 hover:bg-green-700 text-white w-14 h-10 
                    rounded focus:outline-none focus:shadow-outline
                    dark:shadow-slate-900 dark:shadow-lg shadow-zinc-700 shadow-md"
        >
            New
        </button>
    );
}

export default function Boton(text: string, color = "blue", onClick: () => void) {
    const style = `bg-${color}-500 hover:bg-${color}-600`
    return (
        <button
            onClick={() => onClick()}
            className={`dark:text-slate-600 w-1/6 md:w-fit lg:w-fit p-2 rounded m-4 ${style}`}>
            {text}
        </button>
    );
};

export function buttonBack(handleRedireccion: MouseEventHandler<HTMLButtonElement> | undefined) {
    return (
        <button
            className="bg-white text-center w-48 rounded-2xl h-14 relative
                       text-black text-xl font-semibold group scale-75"
            type="button"
            onClick={handleRedireccion}
        >
            <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center 
                            justify-center absolute left-1 top-[4px] 
                            group-hover:w-[184px] z-10 duration-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    height="25px"
                    width="25px"
                >
                    <path
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        fill="#000000"
                    ></path>
                    <path
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 
                  45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 
                  0 1 1 45.312 45.312L237.248 512z"
                        fill="#000000"
                    ></path>
                </svg>
            </div>
            <p className="translate-x-2">Go Back</p>
        </button>
    );
}