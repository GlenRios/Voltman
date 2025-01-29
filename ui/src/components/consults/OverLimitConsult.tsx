"use client"
import { useAlert } from "@/src/hooks/alertContxt";
import { useState } from "react";
import Alert from "../alerts/Alert";
import ExceededTable, { ExceededTableProp } from "./ExceededTable";

const OverLimitConsult: React.FC = () => {

    const { showAlert, alertData } = useAlert();
    const [responseData, setResponseData] = useState<ExceededTableProp[] | null>(null)
    const [date, setDate] = useState<string>('');

    const handleSubmit = async () => {
        try {
            if (!date) {
                showAlert(true, "Please select a date", 1000)
                return;
            }
            const response = await fetch(`http://localhost:5050/api/consult/limitExceeded/${date}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 5000)
            }
            setResponseData(data);

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
            <h2 className="text-xl font-bold mb-4">Identify branches that exceeded their monthly limit:</h2>
            <div className="grid grid-cols-1 gap-4">
                <input
                    type="Date"
                    name="startDate"
                    value={date}
                    onChange={(e) => { setDate(e.target.value) }}
                    className="p-2 border rounded"
                    placeholder="Fecha de inicio"
                />
                <button
                    className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Consult
                </button>
            </div>
            {responseData && <ExceededTable Data={responseData}/>}
        </div>
    );
}

export default OverLimitConsult;