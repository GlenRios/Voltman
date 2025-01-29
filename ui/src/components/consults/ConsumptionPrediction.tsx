"use client";
import React, { useState } from 'react';
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";


const ConsumptionPrediction: React.FC<{ names: string[] }> = ({ names }) => {

    const { showAlert, alertData } = useAlert();
    const [responseData, setResponseData] = useState(null);
    const [selectedName, setSelectName] = useState<string>('');
    const [prediction, setPrediction] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (!selectedName) {
                showAlert(true, "Please select a Branch", 1000)
                return;
            }
            const response = await fetch(`http://localhost:5050/api/consult/prediction/${selectedName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 5000)
                return;
            }
            setPrediction(data.Prediction);
            setResponseData(data.Data);
        } catch (Error) {
            console.error(Error)
        }
    }

    return (
        <div className="p-4 rounded shadow flex flex-col item-center justify-center">
            {alertData.isVisible && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => showAlert(false, "", 0)}
                />
            )}
            <h2 className="tittle">Predict consumption for the next trimester:</h2>
            <div className="grid grid-cols-1">
                <label htmlFor="company" className='subtittle'>company:</label>
                <select
                    name="Company"
                    value={selectedName}
                    onChange={(e) => { setSelectName(e.target.value) }}
                    className="selector"
                >
                    <option value="">Selecciona una sucursal</option>
                    {names.map((name, index) => (
                        <option className="text-black"
                            key={index}
                            value={name}
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
            </div>
            {prediction &&
                <div>
                    <h2 className="tittle">Response: {prediction}</h2>
                </div>}
        </div>
    );
};

export default ConsumptionPrediction;
