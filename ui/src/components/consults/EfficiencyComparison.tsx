"use client";
import React, { useState } from 'react';

interface EfficiencyComparisonProps {
    branch: string;
    policyDate: string;
}

const EfficiencyComparison: React.FC<{ names: string[] }> = ({ names }) => {

    const [selectedName, setSlelctedName] = useState<string>('')
    const [date, setDate] = useState<string>('');
    const handleSubmit = () => {
        // Aquí enviarías la solicitud al backend con formData
        console.log('Fetching efficiency comparison data:');
    };

    return (
        <div className="p-4 rounded shadow">
            <h2 className="tittle">Comparison of Energy Efficiency:</h2>
            <div className="grid grid-cols-1">
                <label htmlFor="Company" className='subtittle'>company:</label>
                <select
                    name="Company"
                    value={selectedName}
                    onChange={(e) => { setSlelctedName(e.target.value) }}
                    className="styleInput"
                >
                    <option value="">Select a Company</option>
                    {names.map((name, index) => (
                        <option className="text-black"
                            key={index}
                            value={name}
                            onClick={() => { setSlelctedName(name) }}
                        >
                            {name}
                        </option>
                    ))}
                </select>
                <label htmlFor="Date" className="subtittle">date:</label>
                <input
                    type="Date"
                    name="Date"
                    value={date}
                    onChange={(e) => { setDate(e.target.value) }}
                    className="styleInput"
                />
                <button
                    className="buttonGreen mt-4"
                    onClick={handleSubmit}
                >
                    Consultar
                </button>
            </div>
        </div>
    );
};

export default EfficiencyComparison;
