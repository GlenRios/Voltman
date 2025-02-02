"use client";
import React, { useEffect, useState } from "react";
import EquipmentTable, { EquipmentTableProp } from "./EquipmentTable";
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";
import { getToken } from '@/src/hooks/handleToken';


const EquipmentQuery: React.FC<{ names: string[] }> = ({ names }) => {

    const { showAlert, alertData } = useAlert();
    const [areas, setAreas] = useState<string[] | null>(null);
    const [selectCompany, setSelectCompany] = useState<string>('')
    const [selectArea, setSelectArea] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const token = getToken();

    const handleSubmit = async () => {
        try {
            setLoading(false);
            if (!selectCompany || !selectArea) {
                showAlert(true, "Please complete all fields", 1000)
                return;
            }
            setLoading(true);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { getAreas(); }, [selectCompany])
    const fetchAreasNames = async () => {
        try {
            if (!selectCompany) return;
            const response = await fetch(`http://localhost:5050/api/consult/areas/${selectCompany}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json()
            if (!response.ok) {
                showAlert(true, data.error, 5000);
                return;
            }
            const names = data.map((item: { Name: any; }) => (item.Name))
            setAreas(names);
        }
        catch (error) {
            console.error(error);
        }
    }
    const getAreas = () => {
        fetchAreasNames();
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
            <h2 className="tittle">Consult Equipments:</h2>
            <div className="grid grid-cols-1">
                <label htmlFor="Company" className="subtittle">company:</label>
                <select
                    name="company"
                    value={selectCompany}
                    onChange={(e) => setSelectCompany(e.target.value)}
                    className="selector"
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
                <label htmlFor="Company" className="subtittle">area:</label>
                <select
                    name="Area"
                    value={selectArea}
                    onChange={(e) => setSelectArea(e.target.value)}
                    className="selector"
                >
                    <option value="">Select a Area</option>
                    {areas && areas.map((name, index) => (
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
                    className="buttonGreen m-4 mb-0"
                    onClick={handleSubmit}
                >
                    Consultar
                </button>
            </div>
            {loading &&
                <div>
                    {/* <button onClick={() => setLoading(false)} className="buttonRed m-4 mb-0">X</button> */}
                    <EquipmentTable branch={selectCompany} area={selectArea} />
                </div>
            }
        </div>
    );
}

export default EquipmentQuery
