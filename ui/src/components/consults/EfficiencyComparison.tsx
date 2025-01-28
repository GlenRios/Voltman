"use client";
import React, { useState } from 'react';
import Selector from '@/src/components/selects/Selector';

interface EfficiencyComparisonProps {
    branch: string;
    policyDate: string;
}

const EfficiencyComparison: React.FC = () => {
    const [formData, setFormData] = useState<EfficiencyComparisonProps>({
        branch: '',
        policyDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Aquí enviarías la solicitud al backend con formData
        console.log('Fetching efficiency comparison data:', formData);
    };

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Comparación de Eficiencia</h2>
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
                    type="date"
                    name="policyDate"
                    value={formData.policyDate}
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

export default EfficiencyComparison;
