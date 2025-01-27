import { MouseEventHandler } from "react";

export function ButtonNew(fun: MouseEventHandler<HTMLButtonElement> | undefined) {
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

export function Boton(text: string, color = "blue", onClick: () => void) {
    const style = `bg-${color}-500 hover:bg-${color}-600`
    return (
        <button
            onClick={onClick}
            className={`dark:text-slate-600 w-1/6 md:w-fit lg:w-fit p-2 rounded m-4 ${style}`}>
            {text}
        </button>
    );
};

export default function buttonBack(handleRedireccion: MouseEventHandler<HTMLButtonElement> | undefined) {
    return (
        <button
            className="bg-white text-center w-48 rounded-2xl h-14 relative
                       text-black text-xl font-semibold group scale-75"
            type="button"
            onClick={handleRedireccion}>
            <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
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
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                        fill="#000000"
                    ></path>
                </svg>
            </div>
            <p className="translate-x-2">Go Back</p>
        </button>
    );
}

export function buttonEdit(editFunction: MouseEventHandler<HTMLButtonElement> | undefined) {
    return (
        <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
            <svg className="w-6 stroke-green-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <button
                className="font-semibold text-sm text-green-700"
                onClick={editFunction}>
                Edit
            </button>
        </div>
    );
};

export function buttonDelete(deleteFunction: MouseEventHandler<HTMLButtonElement> | undefined) {
    return (
        <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
            <svg className="w-6 stroke-red-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <button
                className="font-semibold text-sm text-red-700"
                onClick={deleteFunction}>
                Delete
            </button>
        </div>
    );
};