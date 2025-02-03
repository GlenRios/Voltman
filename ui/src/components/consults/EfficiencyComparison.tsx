"use client";
import React, { useState } from 'react';
import { getToken } from '@/src/hooks/handleToken';
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";
import { LineChart } from '../charts/LineChart';

const EfficiencyComparison: React.FC<{ names: string[] }> = ({ names }) => {

    const { showAlert, alertData } = useAlert();
    const token = getToken();
    const [selectedName, setSlelctedName] = useState<string>('')
    const [date, setDate] = useState<string>('');

    // Datos de la grafica
    const [totalBefore, setTotalBefore] = useState(null);
    const [totalAfter, setTotalAfter] = useState(null);
    const [dataBefore, setDataBefore] = useState(null);
    const [dataAfter, setDataAfter] = useState(null);

    const handleSubmit = async () => {
        try {
            if (!date || !selectedName) {
                showAlert(true, 'please complete all fields', 1500);
                return;
            }
            const response = await fetch("http://localhost:5050/api/consult/compareConsumption/", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Date: date, Name: selectedName })
            });
            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 2500)
                return;
            }
            setTotalBefore(data.TotalBefore);
            setTotalAfter(data.TotalAfter);
            setDataBefore(data.DataBefore);
            setDataAfter(data.DataAfter);
        } catch (error: any) {
            showAlert(true, error.message, 1500);
        }
    };

    return (
        <div className="consult">
            {alertData.isVisible && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => showAlert(false, "", 0)}
                />
            )}
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
                        <option className="text-black dark:text-white"
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
            {totalBefore && dataBefore &&
                <div className='my-2'>
                    <h1 className='tittle'>Total before: {totalBefore}</h1>
                    <LineChart data={dataBefore} index={'Date'} categories={["Value"]} />
                </div>
            }
            {totalAfter && dataAfter &&
                <div>
                    <h1 className='tittle'>Total after: {totalAfter}</h1>
                    <LineChart data={dataAfter} index={'Date'} categories={["Value"]} />
                </div>
            }
        </div>
    );
};

export default EfficiencyComparison;
