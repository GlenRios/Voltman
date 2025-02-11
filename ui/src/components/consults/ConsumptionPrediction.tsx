"use client";
import React, { useState } from 'react';
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";
import { LineChart } from "@/src/components/charts/LineChart";
import { getToken } from '@/src/hooks/handleToken';


const ConsumptionPrediction: React.FC<{ names: string[] }> = ({ names }) => {

    const { showAlert, alertData } = useAlert();
    const [responseData, setResponseData] = useState(null);
    const [selectedName, setSelectName] = useState<string>('');
    const [prediction, setPrediction] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const token = getToken();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (!selectedName) {
                showAlert(true, "Please select a Branch", 1000)
                return;
            }
            const response = await fetch(`http://localhost:5050/api/consult/prediction/${selectedName}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
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
        <div className="consult">
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
                    className="styleInput"
                >
                    <option value="">Select a company</option>
                    {names.map((name, index) => (
                        <option className="text-black dark:text-white"
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
                    <div>
                        <LineChart data={responseData} index={'Date'} categories={["Consume"]}  />
                    </div>
                </div>}
        </div>
    );
};

export default ConsumptionPrediction;
