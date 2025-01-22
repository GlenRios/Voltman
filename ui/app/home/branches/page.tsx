'use client'
import React, { useEffect, useState } from "react"
import Branch from "@/src/models/Branch";
import Area from "@/src/models/Areas";
import Equipments from "@/src/models/Equipments";
import { fetchBranchesService, submitBranchService, deleteBranchService } from "@/src/api/branchService";
import { fetchAreasService, submitAreaService, deleteAreaService } from "@/src/api/areaSrevice";
import { useRouter } from "next/navigation";
import logo from "@/src/components/logo";
import { Boton } from "@/src/components/buttons";
import { goHome } from "@/src/hooks/handleRouts";
import { getToken } from "@/src/hooks/handleToken";
import FormComponent from "@/src/components/formAddBranch";

export default function branchesPage() {

    const router = useRouter();
    const token = getToken();

    //============================== BRANCHES ==============================================

    const [branchesName, setBranchesName] = useState<{ name: string; id: number }[]>([]);
    const [branchInfo, setBranchInfo] = useState<Branch>({
        id: -1,
        name: "",
        address: "",
        type: "",
        limit: '0',
        aumento: '0',
        porciento: '0.0',
    })
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
    const handleSelectBranch = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBranch(event.target.value);
    };
    const [formData, setFormData] = useState<Branch>(branchInfo);
    const [branchName, setBranchName] = useState<string>('');
    const [branchAddress, setBranchAddress] = useState<string>('');
    const [branchType, setBranchType] = useState<string>('');
    const [branchLimit, setBranchLimit] = useState<string>('0');
    const [branchPercent, setBranchPercent] = useState<string>('15');
    const [branchIncrease, setBranchIncrease] = useState<string>('20');
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    //Obtener nombres de las branches al abrir la pagina
    useEffect(() => { fetchBranches(); }, []);
    const fetchBranches = async () => {
        try {
            const response = await fetch("http://localhost:5050/api/branch", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            const names = data.map((item: { id: number; Name: string; }) => ({
                id: item.id ?? null,       // Si falta, asigna null
                name: item.Name ?? "N/A"   // Si falta, asigna "N/A"
            }))// Elimina valores vacíos
            setBranchesName(names);

        } catch (Error) {
            console.error(Error)
        }
    };
    //Obtener los datos de la sucursal seleccionada
    const getBranchInfo = async () => {
        try {
            if (!selectedBranch) {
                throw Error("Select a Branch");
            }
            const response = await fetch(`http://localhost:5050/api/branch/info/${selectedBranch}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            const info = {
                id: data.id,
                name: data.Name,
                address: data.Addr,
                type: data.Type,
                limit: data.Limit,
                aumento: data.Increase,
                porciento: data.Extra_Percent
            }
            setBranchInfo(info);
            setBranchName(info.name);
            setBranchType(info.type);
            setBranchAddress(info.address);
            setBranchLimit(info.limit);
            setBranchPercent(info.porciento);
            setBranchIncrease(info.aumento);

        } catch (error) {
            console.error(error);
        }
    }
    const deletedBranch = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/branch/${branchInfo.id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { Extra_Percent: branchPercent, Increase: branchIncrease }
                )
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const editInfoBranch = async () => {
        try {
            if (!branchName || !branchType || !branchAddress || !branchLimit) {
                throw new Error("Please complete all fields.");
            }
            else if (branchInfo.id === -1) {
                throw new Error("Invalid branch id");
            }
            const response = await fetch(`http://localhost:5050/api/branch/${branchInfo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { Name: branchName, Addr: branchAddress, Type: branchType, Limit: branchLimit }
                )
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            setBranchInfo({
                id: branchInfo.id,
                name: branchName,
                address: branchAddress,
                type: branchType,
                limit: branchLimit,
                aumento: branchIncrease,
                porciento: branchPercent,
            });
        } catch (error) {
            console.log(error);
        }
    }
    const editRestInfoBranch = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/branch/${branchInfo.id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const restInfoBranch = () => {
        setBranchName(branchInfo.name);
        setBranchType(branchInfo.type);
        setBranchAddress(branchInfo.address);
        setBranchLimit(branchInfo.limit);
    }
    const restRestrictInfoBranch = () => {
        setBranchPercent(branchInfo.porciento);
        setBranchIncrease(branchInfo.aumento);
    }
    const addBranch = () => {
        setShowAddForm(!showAddForm);
    }

    //========================= AREAS ===========================================

    const [areas, setAreas] = useState<Area[]>([])
    const [showAreas, setShowAreas] = useState<boolean>(false);
    // const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null); // ID de la fila que se esta editando
    const [isAdding, setIsAdding] = useState(false); // Controla si se está agregando una nueva área
    const [newArea, setNewArea] = useState({ Name: "", Responsible: "" }); // Datos de la nueva área
    const [searchQuery, setSearchQuery] = useState("");
    const [editFormData, setEditFormData] = useState({ id: -1, Name: "", Responsible: "", Company: "" });
    // Obtener la lista de areas de la sucursal seleccionada
    const fetchAreas = async () => {
        try {
            if (!token) {
                throw new Error("Please log in");
            }
            else {
                if (!showAreas) {
                    const response = await fetch(`http://localhost:5050/api/area/${branchInfo.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        const data = await response.json();
                        throw new Error(data.error);
                    }
                    const data: Area[] = await response.json();
                    setAreas(data);
                    setShowAreas(true);
                }
                setShowAreas(!showAreas);
            }
        } catch (error) {
            console.error(error);
        }
    }
    // Agrega una nueva área
    const handleAddArea = async () => {
        try {
            const response = await fetch("http://localhost:5050/api/area/", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { Name: newArea.Name, Responsible: newArea.Responsible, Company: branchInfo.name }
                )
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            else {
                setAreas((prev) => [...prev, data]);
                setNewArea({ Name: "", Responsible: "" });
                setIsAdding(false);
            }
        } catch (error) {
            console.error(error);
        }
    };
    // Cancela la adición de una nueva área
    const handleCancelAdd = () => {
        setNewArea({ Name: "", Responsible: "" });
        setIsAdding(false);
    };
    // Inicia la edición de una fila
    const handleEditClick = (area: Area) => {
        setEditingId(area.id);
        setEditFormData({ id: area.id, Name: area.Name, Responsible: area.Responsible, Company: area.Company });
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
    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/area/${editFormData.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { Name: editFormData.Name, Responsible: editFormData.Responsible, Company: editFormData.Company }
                )
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            else {
                setAreas((prev) =>
                    prev.map((area) =>
                        area.id === editingId
                            ? { ...area, Name: editFormData.Name, Responsible: editFormData.Responsible }
                            : area
                    )
                );
                setEditingId(null);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // Cancela la edición 
    const handleCancelClick = () => {
        setEditingId(null);
    };
    // Elimina un area
    const handleDeleteClick = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5050/api/area/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error);
            }
            setAreas((prev) => prev.filter((area) => area.id !== id));
        } catch (error) {
            console.log(error)
        }
    };
    // Maneja el filtro por búsqueda
    const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchQuery(e.target.value);
    };
    // Filtra las áreas según la búsqueda
    const filteredAreas = areas.filter((area) =>
        area.Name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="flex flex-col items-center justify-center p-4 m-4">
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
                {showAddForm &&
                    <div className="flex flex-col w-1/4 h-auto m-2 item-center justify-center">
                        <FormComponent />
                    </div>}
                <select
                    id="branch-selector"
                    value={selectedBranch ? selectedBranch : ""}
                    onChange={handleSelectBranch}
                    className="w-auto max-w-64 border border-gray-700 rounded-lg p-2 text-lg dark:bg-gray-800 dark:text-white"
                >
                    <option value="">Selecciona una sucursal</option>
                    {branchesName.map((branch, index) => (
                        <option key={index} value={branch.name} onClick={() => getBranchInfo()}>
                            {branch.name}
                        </option>
                    ))}
                </select>
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
                                        value={branchName}
                                        onChange={(e) => setBranchName(e.target.value)}
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
                                        value={branchAddress}
                                        onChange={(e) => setBranchAddress(e.target.value)}
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
                                        value={branchType}
                                        onChange={(e) => setBranchType(e.target.value)}
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
                                        value={branchLimit}
                                        onChange={(e) => setBranchLimit(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={restInfoBranch}
                                    className="px-4 py-2 text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                                >
                                    Restablecer
                                </button>
                                <button
                                    onClick={() => editInfoBranch()}
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
                                    value={branchIncrease}
                                    onChange={(e) => setBranchIncrease(e.target.value)}
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
                                    value={branchPercent}
                                    onChange={(e) => setBranchPercent(e.target.value)}
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={restRestrictInfoBranch}
                                    className="px-4 py-2 text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                                >
                                    Restablecer
                                </button>
                                <button
                                    onClick={() => editRestInfoBranch}
                                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Areas information */}
                    <div className="m-4">
                        <button
                            onClick={() => fetchAreas()}
                            className="px-4 py-2  text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            {showAreas ? "Hide Areas" : "Show Areas"}
                        </button>
                    </div>
                    {showAreas &&
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
                                                                id="Name"
                                                                type="text"
                                                                className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                value={editFormData.Name}
                                                                onChange={handleEditChangeArea}
                                                            />
                                                        </td>
                                                        <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap">
                                                            <input
                                                                id="Responsible"
                                                                type="text"
                                                                className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                value={editFormData.Responsible}
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
                                                            {area.Name}
                                                        </td>
                                                        <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                                            {area.Responsible}
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
                                                        id="Name"
                                                        type="text"
                                                        placeholder="Name"
                                                        className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={newArea.Name}
                                                        onChange={handleNewAreaChange}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                                    <input
                                                        id="Responsible"
                                                        type="text"
                                                        placeholder="Responsible"
                                                        className="w-full px-3 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={newArea.Responsible}
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
                    }

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