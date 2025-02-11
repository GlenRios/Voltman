"use client"
import React, { useEffect, useState } from "react";
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";
import { LineChart } from "@/src/components/charts/LineChart";
import { getToken } from '@/src/hooks/handleToken';


interface respType {
    Name: string;
    Date: string;
    Average: number;
}

const MonthlyAverage: React.FC<{ names: string[] }> = ({ names }) => {

    const { showAlert, alertData } = useAlert();
    const [selectors, setSelectors] = useState<string[]>([""]);
    const [responseData, setREsponseData] = useState<respType[] | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = getToken();

    // Manejar cambio en un selector
    const handleSelectorChange = (index: number, value: string) => {
        const updatedSelectors = [...selectors];
        updatedSelectors[index] = value;
        setSelectors(updatedSelectors);
    };

    // Agregar un nuevo selector
    const addSelector = () => {
        setSelectors([...selectors, ""]);
    };

    // Enviar los datos al backend
    const handleConsult = async () => {
        setIsSubmitting(true);
        setSelectors(selectors.filter(name => name !== ''));
        if(selectors.length === 0){
            setREsponseData(null);
            setIsSubmitting(false);
            return;
        }
        try {
            const response = await fetch("http://localhost:5050/api/consult/averageMonthly/", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectors.filter(name => name !== '')),
            });

            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 5000);
                return;
            }
            if (data && data.length !== 0)
                setREsponseData(data);
            else
                setREsponseData(null);
        } catch (error:any) {
            showAlert(true,error.message,2000);
        } finally {
            setIsSubmitting(false);
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
            <h1 className="tittle">Monthly Average</h1>
            <label htmlFor="Companies" className="subtittle">Companies:</label>
            {selectors.map((selected, index) => (
                <div key={index} className="mb-4 flex flex-row gap-1">
                    <select
                        value={selected}
                        onChange={(e) => handleSelectorChange(index, e.target.value)}
                        className="styleInput"
                    >
                        <option value="">Select a Company</option>
                        {names.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button
                        className="buttonRed"
                        onClick={() => setSelectors(selectors.filter((s, n) => n !== index))}>
                        X
                    </button>
                </div>

            ))}
            <div className="flex flex-row gap-2">
                <button onClick={addSelector} className="buttonBlue">
                    Add Company
                </button>

                <button
                    onClick={handleConsult}
                    disabled={isSubmitting}
                    className={`buttonGreen ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    Consult
                </button>
            </div>
            {responseData &&
                <div>
                    <LineChart data={responseData} index={'Date'} categories={selectors} />
                </div>
            }
        </div>
    );
};

export default MonthlyAverage;
