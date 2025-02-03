"use client"
import { useAlert } from "@/src/hooks/alertContxt";
import { useState } from "react";
import Alert from "../alerts/Alert";
import ExceededTable, { ExceededTableProp } from "./ExceededTable";
import { getToken } from '@/src/hooks/handleToken';

const OverLimitConsult: React.FC = () => {

    const { showAlert, alertData } = useAlert();
    const [responseData, setResponseData] = useState<ExceededTableProp[] | null>(null)
    const [date, setDate] = useState<string>('');
    const token = getToken();

    const handleSubmit = async () => {
        try {
            if (!date) {
                showAlert(true, "Please select a date", 1000)
                return;
            }
            const response = await fetch(`http://localhost:5050/api/consult/limitExceeded/${date}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const data = await response.json();
                showAlert(true, data.error, 2300)
                return;
            }
            const data:ExceededTableProp[] = await response.json();
            setResponseData(data);

        } catch (error:any) {
            showAlert(true,error.message,1500);
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
            <h2 className="tittle">Identify branches that exceeded their monthly limit:</h2>
            <div className="grid grid-cols-1 gap-4">
                <label htmlFor="Date" className="subtittle">date:</label>
                <input
                    type="Date"
                    name="startDate"
                    value={date}
                    onChange={(e) => { setDate(e.target.value) }}
                    className="styleInput"
                    placeholder="Fecha de inicio"
                />
                <button
                    className="buttonGreen mb-4"
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
