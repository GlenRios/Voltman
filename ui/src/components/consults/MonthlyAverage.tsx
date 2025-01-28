"use client";
import React, { useState } from 'react';

interface MonthlyAverageProps {
    branch: string;
    years: number[];
}

const MonthlyAverage: React.FC = () => {
    const [formData, setFormData] = useState<MonthlyAverageProps>({
        branch: '',
        years: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'years') {
            const yearsArray = value.split(',').map((year) => parseInt(year.trim()));
            setFormData({ ...formData, years: yearsArray });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = () => {
        // Aquí enviarías la solicitud al backend con formData
        console.log('Fetching monthly average data:', formData);
    };

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Promedio Mensual</h2>
            <div className="grid grid-cols-1 gap-4">
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
                <input
                    type="text"
                    name="years"
                    placeholder="Años (ej: 2021, 2022, 2023)"
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
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

export default MonthlyAverage;
