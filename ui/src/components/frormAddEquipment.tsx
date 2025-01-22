import React, { useState } from "react";
import Equipment from "@/src/models/Equipments";

const EquipmentForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        Area: initialData.Area || "",
        Brand: initialData.Brand || "",
        Model: initialData.Model || "",
        Type: initialData.Type || "",
        Nominal_Capacity: initialData.Nominal_Capacity || 0,
        Installation_Date: initialData.Installation_Date || "",
        Estimated_Lifespan: initialData.Estimated_Lifespan || 0,
        Maintenance_Status: initialData.Maintenance_Status || "",
        CriticalEnergySystem: initialData.CriticalEnergySystem || 0,
        Usage_Frequency: initialData.Usage_Frequency || "",
        Energy_Efficiency: initialData.Energy_Efficiency || 0,
        Average_Daily_Consumption: initialData.Average_Daily_Consumption || 0,
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Valida los datos antes de enviar
        onSubmit(formData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {initialData.Area ? "Editar Equipo" : "Crear Nuevo Equipo"}
            </h2>
            <form className="space-y-4" onSubmit={handleCreate}>
                <div>
                    <label
                        htmlFor="Area"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Área
                    </label>
                    <input
                        id="Area"
                        name="Area"
                        type="text"
                        value={formData.Area}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="Brand"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Marca
                    </label>
                    <input
                        id="Brand"
                        name="Brand"
                        type="text"
                        value={formData.Brand}
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
                        Modelo
                    </label>
                    <input
                        id="Model"
                        name="Model"
                        type="text"
                        value={formData.Model}
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
                        Tipo
                    </label>
                    <input
                        id="Type"
                        name="Type"
                        type="text"
                        value={formData.Type}
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
                        Capacidad Nominal
                    </label>
                    <input
                        id="Nominal_Capacity"
                        name="Nominal_Capacity"
                        type="number"
                        value={formData.Nominal_Capacity}
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
                        Fecha de Instalación
                    </label>
                    <input
                        id="Installation_Date"
                        name="Installation_Date"
                        type="date"
                        value={formData.Installation_Date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="Estimated_Lifespan"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Vida Útil Estimada (años)
                    </label>
                    <input
                        id="Estimated_Lifespan"
                        name="Estimated_Lifespan"
                        type="number"
                        value={formData.Estimated_Lifespan}
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
                        Estado de Mantenimiento
                    </label>
                    <input
                        id="Maintenance_Status"
                        name="Maintenance_Status"
                        type="text"
                        value={formData.Maintenance_Status}
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
                        Sistema Energético Crítico
                    </label>
                    <input
                        id="CriticalEnergySystem"
                        name="CriticalEnergySystem"
                        type="number"
                        value={formData.CriticalEnergySystem}
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
                        Frecuencia de Uso
                    </label>
                    <input
                        id="Usage_Frequency"
                        name="Usage_Frequency"
                        type="text"
                        value={formData.Usage_Frequency}
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
                        Eficiencia Energética
                    </label>
                    <input
                        id="Energy_Efficiency"
                        name="Energy_Efficiency"
                        type="number"
                        value={formData.Energy_Efficiency}
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
                        Consumo Diario Promedio
                    </label>
                    <input
                        id="Average_Daily_Consumption"
                        name="Average_Daily_Consumption"
                        type="number"
                        value={formData.Average_Daily_Consumption}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="ml-4 px-6 py-2 text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EquipmentForm;
