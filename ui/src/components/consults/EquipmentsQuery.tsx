"use client";
import React, { useEffect, useState } from "react";
import EquipmentTable, { EquipmentTableProp } from "./EquipmentTable";
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";

const EquipmentQuery: React.FC<{ names: string[] }> = ({ names }) => {

    const { showAlert, alertData } = useAlert();
    const [areas, setAreas] = useState<string[]>([]);
    const [selectCompany, setSelectCompany] = useState<string>('')
    const [selectArea, setSelectArea] = useState<string>('')

    const handleSubmit = () => {

    };
    // useEffect(() => { 
    //     await fetchAreasNames(); 
    // }, [selectCompany]);

    const fetchAreasNames = async () => {
        try{
            const response = await fetch(`http://localhost:5050/api/consult/areas/${selectCompany}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json()
            if(!response.ok){
                showAlert(true, data.error, 5000);
                return;
            }
            setAreas(data);
        }
        catch(error){
            console.error(error);
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
            <h2 className="text-xl font-bold mb-4">Equipments:</h2>
            <div className="grid grid-cols-1 gap-4">
                <select
                    name="company"
                    value={selectCompany}
                    onChange={(e) => setSelectCompany(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Select a company</option>
                    {names.map((name, index) => (
                        <option className="text-black"
                            key={index}
                            value={name}
                            onClick={() => { setSelectCompany(name) }}
                        >
                            {name}
                        </option>
                    ))}
                </select>
                <select
                    name="Area"
                    value={selectArea}
                    onChange={(e) => setSelectArea(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Select a Area</option>
                    {areas.map((name, index) => (
                        <option className="text-black"
                            key={index}
                            value={name}
                            onClick={() => { setSelectArea(name) }}
                        >
                            {name}
                        </option>
                    ))}
                </select>
                <button
                    className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Consultar
                </button>
            </div>
        </div>
    );
}

export default EquipmentQuery