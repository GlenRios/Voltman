'use client'
import React, { useEffect, useState } from "react"
import BranchProps from "@/src/models/Branch";
import Area from "@/src/models/Areas";
import Equipments from "@/src/models/Equipments";
import { fetchBranchesService, submitBranchService, deleteBranchService } from "@/src/api/branchService";
import { fetchAreasService, submitAreaService, deleteAreaService } from "@/src/api/areaSrevice";
import { useRouter } from "next/navigation";
import logo from "@/src/components/logo";
import { Boton } from "@/src/components/buttons";
import { goHome } from "@/src/hooks/handleRouts";
import { getToken } from "@/src/hooks/handleToken";

export default function branchesPage() {

    const router = useRouter();
    const token = getToken();

    //============================== BRANCHES ==============================================
    const [branches, setBranches] = useState<BranchProps[]>([
        { name: "Company1", address: "calle 23/K & L", type: "Humanidades", limit: 1250, aumento: 100, porciento: 0.32 },
        { name: "Company2", address: "calle 43/I & Lima", type: "Venta", limit: 3000, aumento: 250, porciento: 1.00 },
        { name: "Company3", address: "calle 42525/243 & Xem", type: "Compra", limit: 750, aumento: 50, porciento: 0.50 }
    ]);

    const [selectedBranch, setSelectedBranch] = useState<string | null>("Company1");

    const [selectedArea, setSelectedArea] = useState<Area | null>(null);

    const handleSelectBranch = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBranch(event.target.value);
    };
    const originalData = {
        nombre: "John Doe",
        direccion: "1234 Elm Street",
        tipo: "Residencial",
        limite: 500,
        aumento: 50,
        extra: 10.5,
    };

    const [formData, setFormData] = useState(originalData);

    // Manejo de cambios en los inputs
    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    // Restablecer datos al original
    const handleReset = () => {
        setFormData(originalData);
    };

    const addBranch = () => {
        throw new Error("function not implement");
    }
    const deletedBranch = () => {
        throw new Error("function not implement");
    }
    const editInfoBranch = () => {
        throw new Error("function not implement");
    }
    const editRestInfoBranch = () => {
        throw new Error("function not implement");
    }


    const [editFormData, setEditFormData] = useState({ name: "", responsable: "" });

    //========================= AREAS ===========================================

    const [areas, setAreas] = useState<Area[]>([])
    const [editingId, setEditingId] = useState<number | null>(null); // ID de la fila que se esta editando
    const [isAdding, setIsAdding] = useState(false); // Controla si se está agregando una nueva área
    const [newArea, setNewArea] = useState({ name: "", responsable: "" }); // Datos de la nueva área
    const [searchQuery, setSearchQuery] = useState("");
    // Obtener la lista de areas de la sucursal seleccionada
    const fetchArea = async (branchname: string) => {
        try {
            if (!token) {
                throw new Error("Please log in");
            }
            else {
                setAreas(await fetchAreasService(token))
            }
        } catch (error) {

        }
    }
    // Agrega una nueva área
    const handleAddArea = () => {
        setAreas((prev) => [
            ...prev,
            { id: Date.now(), name: newArea.name, responsable: newArea.responsable },
        ]);
        setNewArea({ name: "", responsable: "" });
        setIsAdding(false); // Cierra el formulario de agregar
    };
    // Cancela la adición de una nueva área
    const handleCancelAdd = () => {
        setNewArea({ name: "", responsable: "" });
        setIsAdding(false);
    };
    // Inicia la edición de una fila
    const handleEditClick = (area: Area) => {
        setEditingId(area.id);
        setEditFormData({ name: area.name, responsable: area.responsable });
    };
    // Maneja los cambios en el formulario de edición
    const handleEditChangeArea = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    // Maneja los cambios en el formulario de nueva área
    const handleNewAreaChange = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        setNewArea((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    // Guarda los cambios realizados en el formulario de edición
    const handleSaveClick = () => {
        setAreas((prev) =>
            prev.map((area) =>
                area.id === editingId
                    ? { ...area, name: editFormData.name, responsable: editFormData.responsable }
                    : area
            )
        );
        setEditingId(null);
    };
    // Cancela la edición 
    const handleCancelClick = () => {
        setEditingId(null);
    };
    // Elimina una fila
    const handleDeleteClick = (id: number) => {
        setAreas((prev) => prev.filter((area) => area.id !== id));
    };
    // Maneja el filtro por búsqueda
    const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchQuery(e.target.value);
    };
    // Filtra las áreas según la búsqueda
    const filteredAreas = areas.filter((area) =>
        area.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ================================= EQUIPMENTS ========================================

    const [equipments, setEquipments] = useState<Equipments[]>([
        { area: "Company1" }
    ])
    const [selectedEquipments, setSelectedEquipments] = useState<Equipments | null>(null);
    const addEquipments = () => {
        throw new Error("function not implement");
    }
    const deletedEquipments = () => {
        throw new Error("function not implement");
    }
    const editInfoEquipments = () => {
        throw new Error("function not implement");
    }


    return (
        <main className="min-h-screen p-8 relative bg-[url('http://localhost:3000/images/claro3.jpg')] 
        //               dark:bg-[url('http://localhost:3000/images/oscuro2.jpg')] bg-cover 
        //               bg-no-repeat bg-center bg-fixed ">

            {/* Encabezado de pagina*/}
            <div className='flex justify-center items-center p-4 m-4'>
                {logo(50, 50)}
                <h2 className="text-4xl font-extrabold text-center text-black dark:text-white">
                    Branch management!
                </h2>
            </div>

            {/* Botones */}
            <div className="flex flex-col justify-center p-4 m-4">
                <div className="flex flex-crow items-center  justify-center gap-4 p-4">
                    <div className="flex flex-row">
                        <button
                            className="bg-white text-center w-48 rounded-2xl h-14 relative
                       text-black text-xl font-semibold group scale-75"
                            type="button"
                            onClick={() => goHome(router)}>
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
                        {Boton("New", "green", addBranch)}
                        {Boton("Delete", "red", deletedBranch)}
                    </div>
                </div>
                <select
                    id="branch-selector"
                    value={selectedBranch ? selectedBranch : ""}
                    onChange={handleSelectBranch}
                    className="border border-gray-700 rounded-lg p-2 text-lg dark:bg-gray-800 dark:text-white"
                >
                    <option value="">Selecciona una sucursal</option>
                    {branches.map((branch, index) => (
                        <option key={index} value={branch.name}>
                            {branch.name} - {branch.address}
                        </option>
                    ))}
                </select>
                {/* {selectedBranch && (
                    <p className="text-green-500 font-medium">
                        Sucursal seleccionada: {selectedBranch}
                    </p>
                )} */}
            </div>

            {/* Brach management */}
            {selectedBranch &&
                <div className="flex flex-col">

                    {/* Branch info */}
                    <div className="flex flex-col lg:flex-row p-4 m-4">

                        {/* info */}
                        <div className="card w-auto max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md m-4 ">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Branch info:</h2>

                            {/* Contenedor para los inputs en dos filas */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Nombre */}
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombre">
                                        Nombre
                                    </label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => console.log("Nombre cambiado a:", e.target.value)}
                                    />
                                </div>

                                {/* Dirección */}
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="direccion">
                                        Dirección
                                    </label>
                                    <input
                                        id="direccion"
                                        type="text"
                                        className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => console.log("Dirección cambiada a:", e.target.value)}
                                    />
                                </div>

                                {/* Tipo */}
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="tipo">
                                        Tipo
                                    </label>
                                    <input
                                        id="tipo"
                                        type="text"
                                        className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => console.log("Tipo cambiado a:", e.target.value)}
                                    />
                                </div>

                                {/* Límite */}
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="limite">
                                        Límite
                                    </label>
                                    <input
                                        id="limite"
                                        type="number"
                                        className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => console.log("Límite cambiado a:", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={() => console.log("Formulario restablecido")}
                                    className="px-4 py-2 text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                                >
                                    Restablecer
                                </button>
                                <button
                                    onClick={() => console.log("Formulario guardado")}
                                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>


                        {/* Propiedades de acceso restringido */}
                        <div className="card w-auto max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md m-4 h-auto>">
                            {/* Aumento */}
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="aumento">
                                    Aumento
                                </label>
                                <input
                                    id="aumento"
                                    type="number"
                                    className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                // value={}
                                // onChange={}
                                />
                            </div>

                            {/* % Extra */}
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="extra">
                                    Porcentaje Extra
                                </label>
                                <input
                                    id="extra"
                                    type="number"
                                    step="0.01"
                                    className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                // value={}
                                // onChange={}
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-2">
                                <button
                                    // onClick={}
                                    className="px-4 py-2 text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                                >
                                    Restablecer
                                </button>
                                <button
                                    // onClick={}
                                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Areas information */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Áreas</h2>
                        {/* Barra de busqueda de areas */}
                        <input
                            type="text"
                            placeholder="Buscar por nombre de área..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full px-3 py-2 mb-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="overflow-y-auto max-h-64 rounded-xl">
                            <table className="w-full table-fixed border-collapse border rounded-xl border-gray-300 dark:border-gray-700">
                                <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                        <th className="border border-gray-300 dark:border-gray-700 p-2 text-left w-1/3">
                                            Nombre
                                        </th>
                                        <th className="border border-gray-300 dark:border-gray-700 p-2 text-left w-1/3">
                                            Responsable
                                        </th>
                                        <th className="border border-gray-300 dark:border-gray-700 p-2 text-center w-1/3">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAreas.map((area) => (
                                        <tr key={area.id} className="odd:bg-gray-100 dark:odd:bg-gray-700">
                                            {editingId === area.id ? (
                                                <>
                                                    <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap">
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            value={editFormData.name}
                                                            onChange={handleEditChangeArea}
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap">
                                                        <input
                                                            id="responsable"
                                                            type="text"
                                                            className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            value={editFormData.responsable}
                                                            onChange={handleEditChangeArea}
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                                                        <button
                                                            onClick={handleSaveClick}
                                                            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200 mr-2"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            onClick={handleCancelClick}
                                                            className="px-4 py-2 text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                                        {area.name}
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                                        {area.responsable}
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-700 p-2 text-center m-1">
                                                        <button
                                                            onClick={() => handleEditClick(area)}
                                                            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 mr-2"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(area.id)}
                                                            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                    {isAdding && (
                                        <tr>
                                            <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                                <input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Nombre del área"
                                                    className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={newArea.name}
                                                    onChange={handleNewAreaChange}
                                                />
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                                <input
                                                    id="responsable"
                                                    type="text"
                                                    placeholder="Responsable"
                                                    className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={newArea.responsable}
                                                    onChange={handleNewAreaChange}
                                                />
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-700 p-2 text-center m-1">
                                                <button
                                                    onClick={handleAddArea}
                                                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200 mr-2"
                                                >
                                                    Agregar
                                                </button>
                                                <button
                                                    onClick={handleCancelAdd}
                                                    className="px-4 py-2 text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                                                >
                                                    Cancelar
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {!isAdding && (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                Agregar Área
                            </button>
                        )}
                    </div>



                    {/* Equipments info*/}
                    <div
                        className="bg-slate-400 p-4 m-4">
                        <h2 className="text-4xl font-extrabold text-center text-black dark:text-white">
                            Equipments:
                        </h2>
                        <div>
                            {/* marca, modelo, tipo, capacidad nominal, fecha de instalacion,
                          vida util estimada, estado de mantenimiento, sistema de energia critica
                          frecuencia de uso, eficiencia energetica, consumo promedio diario*/}
                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                                    />
                                    <label
                                        form="username"
                                        className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                                    >Name
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main >
    );
}