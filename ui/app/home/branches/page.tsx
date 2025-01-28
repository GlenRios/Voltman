'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

//models
import Branch from "@/src/models/Branch";
import Area from "@/src/models/Areas";
import Equipment from "@/src/models/Equipments";

//utils and hooks
import { goHome } from "@/src/hooks/handleRouts";
import { getToken } from "@/src/hooks/handleToken";
import { useAlert } from "@/src/hooks/alertContxt";

//Components
import Alert from "@/src/components/alerts/Alert";
import Logo from "@/src/components/logo";
import FormComponent from "@/src/components/forms/formAddBranch";
import { Boton } from "@/src/components/buttons/buttons";


export default function branchesPage() {

    const router = useRouter();
    const token = getToken();
    const { showAlert, alertData } = useAlert();

    //============================== BRANCHES ==============================================

    const [branchesName, setBranchesName] = useState<{ name: string; id: number }[]>([]);
    // guarda la informacion real de la sucursal seleccionada
    const [branchInfo, setBranchInfo] = useState<Branch>({
        id: -1,
        name: "",
        address: "",
        type: "",
        limit: '0',
        aumento: '0',
        porciento: '0.0',
    })
    // nombre de la sucursal seleccionada
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
    // maneja el cambio en la sucursal seleccionada
    const handleSelectBranch = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBranch(event.target.value);
    };
    // valores de los inputs:
    const [branchName, setBranchName] = useState<string>('');
    const [branchAddress, setBranchAddress] = useState<string>('');
    const [branchType, setBranchType] = useState<string>('');
    const [branchLimit, setBranchLimit] = useState<string>('0');
    const [branchPercent, setBranchPercent] = useState<string>('15');
    const [branchIncrease, setBranchIncrease] = useState<string>('20');
    // dice si mostrar el formulario de agregar sucursales
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    //Obtener nombres de las sucursales al abrir la pagina
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
            if (!response.ok) {
                showAlert(true, data.error, 5000)
            }
            const names = data.map((item: { id: number; Name: string; }) => ({
                id: item.id ?? null,       // Si falta, asigna null
                name: item.Name ?? "N/A"   // Si falta, asigna "N/A"
            }))// Elimina valores vacíos
            setBranchesName(names);
            // showAlert(false, data.message || "Operation was successful!", 3000)

        } catch (Error) {
            console.error(Error)
        }
    };
    // Obtener los datos de la sucursal seleccionada
    const getBranchInfo = async () => {
        try {
            if (!selectedBranch) {
                showAlert(true, "Select a Branch", 5000);
            }
            const response = await fetch(`http://localhost:5050/api/branch/info/${selectedBranch}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 5000);
            }
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
    // Eliminar la sucursal seleccionada
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
                showAlert(true, data.error, 5000);
            }
            else {
                showAlert(false, "Operation was successful!", 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // Editar la informacion basica de una Sucursal
    const editInfoBranch = async () => {
        try {
            if (!branchName || !branchType || !branchAddress || !branchLimit) {
                showAlert(true, "Please complete all fields.", 5000);
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
                showAlert(true, data.error, 5000);
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
            showAlert(false, "Operation was successful!", 3000);
        } catch (error) {
            console.log(error);
        }
    }
    // Editar la informcaion que solo el administrador puede cambiar
    const editRestInfoBranch = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/branch/formule/${branchInfo.id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { Increase: branchIncrease, Extra_Percent: branchPercent }
                )
            });
            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 5000);
                return;
            }
            showAlert(false, "Operation was successful!", 3000)
        } catch (error) {
            console.log(error);
        }
    }
    // Volver a poner los datos reales de la sucursal en los inputs (para los datos basicos)
    const restInfoBranch = () => {
        setBranchName(branchInfo.name);
        setBranchType(branchInfo.type);
        setBranchAddress(branchInfo.address);
        setBranchLimit(branchInfo.limit);
    }
    // Volver a poner los datos reales de la sucursal en los inputs (para los datos restringidos)
    const restRestrictInfoBranch = () => {
        setBranchPercent(branchInfo.porciento);
        setBranchIncrease(branchInfo.aumento);
    }
    // Crear una nueva sucursal
    const addBranch = () => {
        setShowAddForm(!showAddForm);
    }

    //========================= AREAS ===========================================

    const [areas, setAreas] = useState<Area[]>([])
    // dice si mostrar la tabla de las Areas
    const [showAreas, setShowAreas] = useState<boolean>(false);
    // guarda el id del Area que se esta editando o null en caso de que no se este editando ninguna 
    const [editingId, setEditingId] = useState<number | null>(null); // ID de la fila que se esta editando
    // dice si se esta agregando un area nuea
    const [isAdding, setIsAdding] = useState(false); // Controla si se está agregando una nueva área
    // valores de la nueva area
    const [newArea, setNewArea] = useState({ Name: "", Responsible: "" }); // Datos de la nueva área
    // valor insertado en el filtro de busqueda
    const [searchQuery, setSearchQuery] = useState("");
    // guarda los nuvos datos del Area que se esta editando
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
                        showAlert(true, data.error, 5000);
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
                showAlert(true, data.error, 5000);
            }
            else {
                setAreas((prev) => [...prev, data]);
                setNewArea({ Name: "", Responsible: "" });
                setIsAdding(false);
                showAlert(false, "Operation was successful!", 3000);
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
                showAlert(true, data.error, 5000);
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
                showAlert(false, "Operation was successful!", 3000);
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
                showAlert(true, data.error, 5000);
                return;
            }
            setAreas((prev) => prev.filter((area) => area.id !== id));
            showAlert(false, "Operation was successful!", 3000);
        }
        catch (error) {
            console.error(error)
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

    const defaultEq: Equipment = {
        id: 0,
        Area: "",
        Brand: "",
        Model: "",
        Type: "",
        Nominal_Capacity: 0,
        Installation_Date: "",
        Estimated_Lifespan: 0,
        Maintenance_Status: "",
        CriticalEnergySystem: 0,
        Usage_Frequency: 0,
        Energy_Efficiency: 0,
        Average_Daily_Consumption: 0
    };
    const [equipments, setEquipments] = useState<Equipment[]>([])
    // dice si mostrar la tabla de los equipos
    const [showEquipments, setShowEquipments] = useState<boolean>(false);
    // guarda el id del equipo que se esta editando
    const [editingIdEq, setEditingIdEq] = useState<number | null>(null); // ID de la fila que se esta editando
    // dice si se esta agregando un nuevo equipo
    const [isAddingEq, setIsAddingEq] = useState(false); // Controla si se está agregando una nueva área
    // guarda la informacion del equipo que se esta agregando
    const [newEquipment, setNewEquipment] = useState<Equipment>(defaultEq);
    // guarda el valor insertado en la barra de busqueda
    const [searchQueryEq, setSearchQueryEq] = useState("");
    // Guarda los nuevos datos del equipo que se esta editando
    const [editFormDataEq, setEditFormDataEq] = useState<Equipment>(defaultEq);
    // Obtener todos los Equipments de la sucursal seleccionada
    const fetchEquipments = async () => {
        try {
            if (!token) {
                throw new Error("Please log in");
            }
            else {
                if (!showEquipments) {
                    const response = await fetch(`http://localhost:5050/api/equipment/${branchInfo.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        const data = await response.json();
                        showAlert(true, data.error, 5000);
                    }
                    const data: Equipment[] = await response.json();
                    setEquipments(data);
                    setShowEquipments(true);
                }
                setShowEquipments(!showEquipments);
            }
        } catch (error) {
            console.error(error);
        }
    }
    // Agrega un nuevo Equipo
    const handleAddEquipment = async () => {
        try {
            const response = await fetch("http://localhost:5050/api/equipment/", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { ...newEquipment, Company: branchInfo.name }
                )
            });
            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 5000);
            }
            else {
                setEquipments((prev) => [...prev, data]);
                setNewEquipment(defaultEq);
                setIsAddingEq(false);
                showAlert(false, "Operation was successful!", 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };
    // Cancela la creacion de un equipo
    const handleCancelAddEq = () => {
        setNewEquipment(defaultEq);
        setIsAddingEq(false);
    };
    // Inicia la edición de una fila
    const handleEditClickEq = (Equipment: Equipment) => {
        setEditingIdEq(Equipment.id);
        setEditFormDataEq(Equipment);
    };
    // Guarda los cambios realizados
    const handleSaveClickEq = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/equipment/${editFormDataEq.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { ...editFormDataEq, Company: branchInfo.name }
                )
            });
            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 5000);
            }
            else {
                setEquipments((prev) =>
                    prev.map((Equipment) =>
                        Equipment.id === editingId
                            ? { ...Equipment, editFormDataEq }
                            : Equipment
                    )
                );
                setEditingId(null);
                showAlert(false, "Operation was successful!", 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // Cancela la edición 
    const handleCancelClickEq = () => {
        setEditingIdEq(null);
    };
    // Elimina un equipo
    const handleDeleteClickEq = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5050/api/equipment/${id}`,
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
                showAlert(true, data.error, 5000);
            }
            setEquipments((prev) => prev.filter((equipment) => equipment.id !== id));
            showAlert(false, "Operation was successful!", 3000);
        } catch (error) {
            console.log(error)
        }
    };
    // Maneja el filtro por búsqueda de los Equipos
    const handleSearchChangeEq = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchQueryEq(e.target.value);
    };
    // Filtra los equipos por tipo (cambuar type por la propiedad que se quiera filtrar)
    const filteredEquipments = equipments.filter((Equipment) =>
        Equipment.Area.toLowerCase().includes(searchQueryEq.toLowerCase())
    );
    const EquipmentForm = (onSubmit: () => void, onCancel: () => void, isAddForm: boolean) => {

        const handleChange = (e: { target: { name: any; value: any; }; }) => {
            const { name, value } = e.target;
            if (isAddForm) {
                setNewEquipment({ ...newEquipment, [name]: value });
            }
            else {
                setEditFormDataEq({ ...editFormDataEq, [name]: value });
            }
        };

        const handleCreate = (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            onSubmit();
        };

        const handleCancel = () => {
            onCancel();
        };

        return (
            <div className="w-auto mx-auto m-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {newEquipment.Area ? "Edit Equipment" : "Add Equipment"}
                </h2>
                <form className="space-y-4" onSubmit={handleCreate}>

                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col gap-2">
                            <div>
                                <label
                                    htmlFor="Area"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Area
                                </label>
								{/** Cambios **/}
                                <select
                                    id="Area"
                                    name="Area"
                                    value={isAddForm ? newEquipment.Area : editFormDataEq.Area}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
									<option value=""> Selecciona un area </option>
									{areas.map((area) => <option key={area.Name} value={area.Name}>{area.Name}</option>)}
								</select>
								{/**  **/}
                            </div>
                            <div>
                                <label
                                    htmlFor="Brand"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Brand
                                </label>
                                <input
                                    id="Brand"
                                    name="Brand"
                                    type="text"
                                    value={isAddForm ? newEquipment.Brand : editFormDataEq.Brand}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="Model"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Model
                                </label>
                                <input
                                    id="Model"
                                    name="Model"
                                    type="text"
                                    value={isAddForm ? newEquipment.Model : editFormDataEq.Model}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="Type"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Type
                                </label>
                                <input
                                    id="Type"
                                    name="Type"
                                    type="text"
                                    value={isAddForm ? newEquipment.Type : editFormDataEq.Type}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="Nominal_Capacity"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Nominal Capacity
                                </label>
                                <input
                                    id="Nominal_Capacity"
                                    name="Nominal_Capacity"
                                    type="number"
                                    value={isAddForm ? newEquipment.Nominal_Capacity : editFormDataEq.Nominal_Capacity}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="Installation_Date"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Installation Date
                                </label>
                                <input
                                    id="Installation_Date"
                                    name="Installation_Date"
                                    type="Date"
                                    value={isAddForm ? newEquipment.Installation_Date.split(" ")[0] : editFormDataEq.Installation_Date.split(" ")[0]}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <label
                                    htmlFor="Estimated_Lifespan"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Estimated Lifespan (years)
                                </label>
                                <input
                                    id="Estimated_Lifespan"
                                    name="Estimated_Lifespan"
                                    type="number"
                                    value={isAddForm ? newEquipment.Estimated_Lifespan : editFormDataEq.Estimated_Lifespan}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="Maintenance_Status"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Mantenance Status
                                </label>
                                <input
                                    id="Maintenance_Status"
                                    name="Maintenance_Status"
                                    type="text"
                                    value={isAddForm ? newEquipment.Maintenance_Status : editFormDataEq.Maintenance_Status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="CriticalEnergySystem"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Critical Energy System
                                </label>
                                <input
                                    id="CriticalEnergySystem"
                                    name="CriticalEnergySystem"
                                    type="number"
                                    value={isAddForm ? newEquipment.CriticalEnergySystem : editFormDataEq.CriticalEnergySystem}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="Usage_Frequency"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Usage Frequency
                                </label>
                                <input
                                    id="Usage_Frequency"
                                    name="Usage_Frequency"
                                    type="text"
                                    value={isAddForm ? newEquipment.Usage_Frequency : editFormDataEq.Usage_Frequency}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="Energy_Efficiency"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Energy Efficiency
                                </label>
                                <input
                                    id="Energy_Efficiency"
                                    name="Energy_Efficiency"
                                    type="number"
                                    value={isAddForm ? newEquipment.Energy_Efficiency : editFormDataEq.Energy_Efficiency}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="Average_Daily_Consumption"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Average Daily Consumption
                                </label>
                                <input
                                    id="Average_Daily_Consumption"
                                    name="Average_Daily_Consumption"
                                    type="number"
                                    value={isAddForm ? newEquipment.Average_Daily_Consumption : editFormDataEq.Average_Daily_Consumption}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center gap-2">
                        <button
                            type="submit"
                            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="ml-4 px-6 py-2 text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <main className="min-h-screen p-8 relative fondo">
            {alertData.isVisible && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => showAlert(false, "", 0)}
                />
            )}
            {/* Encabezado de pagina*/}
            <div className='flex justify-center items-center p-4 m-4'>
                <Logo
                    width={50}
                    height={50}>
                </Logo>
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
                        <option key={index} value={branch.name} onClick={getBranchInfo}>
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
                                        Name
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
                                        Address
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
                                        Type
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
                                        Limit
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
                                    Restart
                                </button>
                                <button
                                    onClick={() => editInfoBranch()}
                                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Propiedades de acceso restringido */}
                        <div className="card w-auto max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md m-4 h-auto>">
                            {/* Aumento */}
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="aumento">
                                    Increase
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
                                    Extra Percent
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
                                    Restart
                                </button>
                                <button
                                    onClick={editRestInfoBranch}
                                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    Save
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
                                placeholder="Search by name..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full px-3 py-2 mb-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="overflow-y-auto max-h-64 rounded-xl">
                                <table className="w-full table-fixed border-collapse border rounded-xl border-gray-300 dark:border-gray-700">
                                    <thead>
                                        <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                            <th className="border border-gray-300 dark:border-gray-900 p-2 text-left w-1/3">
                                                Name
                                            </th>
                                            <th className="border border-gray-300 dark:border-gray-900 p-2 text-left w-1/3">
                                                Responsible
                                            </th>
                                            <th className="border border-gray-300 dark:border-gray-900 p-2 text-center w-1/3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
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
                                                        Add
                                                    </button>
                                                    <button
                                                        onClick={handleCancelAdd}
                                                        className="px-4 py-2 text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                                                    >
                                                        Cancel
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
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
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={handleCancelClick}
                                                                className="px-4 py-2 text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                                                            >
                                                                Cance
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="border text-gray-800 dark:text-gray-400 border-gray-300 dark:border-gray-900 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                                            {area.Name}
                                                        </td>
                                                        <td className="border text-gray-800 dark:text-gray-400 border-gray-300 dark:border-gray-900 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                                            {area.Responsible}
                                                        </td>
                                                        <td className="border text-gray-800 dark:text-gray-400 border-gray-300 dark:border-gray-900 p-2 text-center m-1">
                                                            <button
                                                                onClick={() => handleEditClick(area)}
                                                                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 mr-2"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(area.id)}
                                                                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {!isAdding && (
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    Add Area
                                </button>
                            )}
                        </div>
                    }

                    {/* Equipments info*/}
                    <div className="m-4">
                        <button
                            onClick={() => fetchEquipments()}
                            className="px-4 py-2  text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            {showEquipments ? "Hide Equipments" : "Show Equipments"}
                        </button>
                    </div>

                    {showEquipments &&

                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Equipments</h2>
                            {/* Barra de busqueda de areas */}
                            <input
                                type="text"
                                placeholder="Search by Area..."
                                value={searchQueryEq}
                                onChange={handleSearchChangeEq}
                                className="w-full px-3 py-2 mb-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="overflow-y-auto max-h-64 rounded-xl">
                                        <table className="w-full table-fixed border-collapse border rounded-xl border-gray-300 dark:border-gray-700">
                                            <thead>
                                                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                                    <th className="border border-gray-300 dark:border-gray-700 p-2 text-left w-1/3">
                                                        Area
                                                    </th>
                                                    <th className="border border-gray-300 dark:border-gray-700 p-2 text-left w-1/3">
                                                        Type
                                                    </th>
                                                    <th className="border border-gray-300 dark:border-gray-700 p-2 text-center w-1/3">
                                                        Installation_Date
                                                    </th>
                                                    <th className="border border-gray-300 dark:border-gray-700 p-2 text-center w-1/3">
                                                        Acciones
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredEquipments.map((item) => (
                                                    <tr key={item.id} className="odd:bg-gray-100 dark:odd:bg-gray-700">


                                                        <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                                            {item.Area}
                                                        </td>
                                                        <td className="border border-gray-300 dark:border-gray-700 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                                            {item.Type}
                                                        </td>
                                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center m-1">
                                                            {item.Installation_Date.toString()}
                                                        </td>
                                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center m-1">
                                                            <button
                                                                onClick={() => handleEditClickEq(item)}
                                                                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 mr-2"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClickEq(item.id)}
                                                                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {!isAddingEq && (
                                        <button
                                            onClick={() => setIsAddingEq(true)}
                                            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                                        >
                                            New Equipment
                                        </button>
                                    )}

                                </div>
                            </div>
                        </div>
                    }
                    <div className="flex flex-col lg:flex-row">
                        {isAddingEq &&
                            <div className="overflow-y-auto max-h-screen fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                {EquipmentForm(handleAddEquipment, handleCancelAddEq, true)}
                            </div>
                        }
                        {editingIdEq &&
                            <div className="overflow-y-auto max-h-screen fixted inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                {EquipmentForm(handleSaveClickEq, handleCancelClickEq, false)}
                            </div>
                        }
                    </div>
                </div>
            }
        </main >
    );
}
