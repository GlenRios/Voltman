"use client";
import React, { useState } from 'react';
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";
import { LineChart } from '../charts/LineChart';
import { getToken } from '@/src/hooks/handleToken';

interface TotalCostProps {
    startDate: string;
    endDate: string;
    Company: string;
}

const TotalCost: React.FC<{ names: string[] }> = ({ names }) => {

    const { showAlert, alertData } = useAlert();
    const [responseData, setResponseData] = useState(null)
    const [formData, setFormData] = useState<TotalCostProps>({
        startDate: '',
        endDate: '',
        Company: '',
    });
    const [selectedName, setSlelctedName] = useState<string>('')
    const token = getToken();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const [totalCost, setTotalCost] = useState<number | null>(null);

    const handleSubmit = async () => {
        try {
            setTotalCost(null);
            if (!formData.Company || !formData.startDate || !formData.endDate) {
                showAlert(true, "Please complete all fields", 1500)
                return;
            }
            const response = await fetch("http://localhost:5050/api/consult/getCost/", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 2500)
                return;
            }
            setTotalCost(Math.abs(data.Total));
            await setResponseData(data.Data);
            console.log(responseData);

        } catch (error: any) {
            showAlert(true, error.message, 1500);
        }
    }

    return (
        <div className="consult">
            {alertData.isVisible && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => showAlert(false, "", 0)}
                />
            )}
            <h1 className="tittle">Total Cost:</h1>
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
                    <option className="text-black dark:text-white"
                        key={index}
                        value={name}
                        onClick={() => { setSlelctedName(name) }}
                    >
                        {name}
                    </option>
                ))}
            </select>
            <button
                className="buttonGreen mt-4"
                onClick={handleSubmit}
            >
                Consult
            </button>
            {totalCost &&
                <div>
                    <div className='my-4'>
                        <h2 className="tittle" >
                            Total Cost: {totalCost}
                        </h2>
                        {responseData &&
                            <LineChart data={responseData} index={'Date'} categories={["Value"]} />
                        }
                    </div>
                </div>}
        </div>
    );
};

export default TotalCost;
