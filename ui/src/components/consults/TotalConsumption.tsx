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
            if (!formData.Company || !formData.startDate || !formData.endDate) {
                showAlert(true, "Please complete all fields", 5000)
                return;
            }
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
        <div className="p-4 rounded shadow">
            {alertData.isVisible && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => showAlert(false, "", 0)}
                />
            )}
            <h2 className="tittle">Total Consumption:</h2>

            <div className="grid grid-cols">
                <label htmlFor="startDate" className='subtittle'>start day:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="styleInput"
                    placeholder="Fecha de inicio"
                />
                <label htmlFor="endDate" className='subtittle'>end day:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="styleInput"
                    placeholder="Fecha de fin"
                />
                <label htmlFor="Company" className='subtittle'>company:</label>
                <select
                    name="Company"
                    value={selectedName}
                    onChange={handleChange}
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
                <button
                    className="buttonGreen m-4 mb-0"
                    onClick={handleSubmit}
                >
                    Consult
                </button>
            </div>
            {totalConsumption &&
                <div>
                    <h2 className="tittle">Response: {totalConsumption}</h2>
                </div>}
        </div>
    );
};

export default TotalConsumption;
