"use client";
import React, { useState } from 'react';

interface TotalConsumptionProps {
    startDate: string;
    endDate: string;
    branch: string;
}

const TotalConsumption: React.FC = () => {
    const [formData, setFormData] = useState<TotalConsumptionProps>({
        startDate: '',
        endDate: '',
        branch: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Aquí enviarías la solicitud al backend con formData
        console.log('Fetching total consumption data:', formData);
    };

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Consumo Total</h2>
            <div className="grid grid-cols-1 gap-4">
                <input
                    type="Date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    placeholder="Fecha de inicio"
                />
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    placeholder="Fecha de fin"
                />
                <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="">Selecciona una sucursal</option>
                    <option value="Branch1">Sucursal 1</option>
                    <option value="Branch2">Sucursal 2</option>
                </select>
                <button
                    className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Consultar
                </button>
            </div>
        </div>
    );
};

export default TotalConsumption;