"use client";
import React, { useState } from 'react';
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";
interface TotalConsumptionProps {
    startDate: string;
    endDate: string;
    Company: string;
}

const TotalConsumption: React.FC<{ names: string[] }> = ({ names }) => {

    const { showAlert, alertData } = useAlert();
    const [responseData, setResponseData] = useState([])
    const [formData, setFormData] = useState<TotalConsumptionProps>({
        startDate: '',
        endDate: '',
        Company: '',
    });
    const [selectedName, setSlelctedName] = useState<string>('')
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const [totalConsumption, setTotalConsumption] = useState<number | null>(null);

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5050/api/consult/totalConsumption/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 5000)
            }
            setTotalConsumption(data.Total);
            setResponseData(data.Data);

        } catch (Error) {
            console.error(Error)
        }
    }

    return (
        <div className="p-4 border rounded shadow">
            {alertData.isVisible && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => showAlert(false, "", 0)}
                />
            )}
            <h2 className="text-xl font-bold mb-4">Total Consumption Consult:</h2>
            <div className="grid grid-cols-1 gap-4">
                <input
                    type="date"
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
                    name="Company"
                    value={selectedName}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="">Selecciona una sucursal</option>
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
                <button
                    className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Consult
                </button>
            </div>
            {totalConsumption &&
                <div>
                    <h2 className="text-xl font-bold mb-4">Response: {totalConsumption}</h2>
                </div>}
        </div>
    );
};

export default TotalConsumption;
