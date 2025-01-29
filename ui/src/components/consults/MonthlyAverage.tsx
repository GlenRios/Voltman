"use client"
import React, { useState } from "react";
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";

interface respType {
    Name: string;
    Date: string;
    Average: number;
}

const MonthlyAverage: React.FC<{ names: string[] }> = ({ names }) => {

    const { showAlert, alertData } = useAlert();
    const [selectors, setSelectors] = useState<string[]>([""]);
    const [responseData, setREsponseData] = useState<respType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        try {
            const response = await fetch("http://localhost:5050/api/consult/averageMonthly/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectors),
            });

            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 5000);
                return;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4">
            {alertData.isVisible && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => showAlert(false, "", 0)}
                />
            )}
            <h1 className="text-2xl font-bold mb-4">Consulta Dinámica</h1>
            {selectors.map((selected, index) => (
                <div key={index} className="mb-4">
                    <select
                        value={selected}
                        onChange={(e) => handleSelectorChange(index, e.target.value)}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Selecciona una opción</option>
                        {names.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            <button onClick={addSelector} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
                New
            </button>

            <button
                onClick={handleConsult}
                disabled={isSubmitting}
                className={`p-2 bg-green-500 text-white rounded hover:bg-green-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {isSubmitting ? "Consultando..." : "Consult"}
            </button>
        </div>
    );
};

export default MonthlyAverage;