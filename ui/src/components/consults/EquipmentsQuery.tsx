"use client";
import React, { useEffect, useState } from "react";
import EquipmentTable, { EquipmentTableProp } from "./EquipmentTable";
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";
import { getToken } from '@/src/hooks/handleToken';
import { fetchEquipments } from "@/src/api/EquipmentService";
import Equipment from "@/src/models/Equipments";


const EquipmentQuery: React.FC<{ names: string[] }> = ({ names }) => {

    const { showAlert, alertData } = useAlert();
    const [areas, setAreas] = useState<string[] | null>(null);
    const [selectCompany, setSelectCompany] = useState<string>('')
    const [selectArea, setSelectArea] = useState<string>('')
    const token = getToken();
    const [responseData, setRedponseData] = useState<Equipment[] | null>(null);

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
        catch (error: any) {
            showAlert(true, error.message, 2000);
        }
    }
    const getAreas = () => {
        fetchAreasNames();
    }

    // Pedir los Equipos
    const getEquipments = async () => {
        try {
            const response = await fetchEquipments(selectCompany, selectArea)
            if (!response.ok) {
                setRedponseData(null);
                const data = await response.json();
                throw new Error(data.error);
            }
            const result: Equipment[] = await response.json();
            setRedponseData(result);
        }
        catch (error: any) {
            showAlert(true, error.message, 2000);
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
            <h1 className="tittle">Consult Equipments:</h1>
            <label htmlFor="Company" className="subtittle">company:</label>
            <select
                name="company"
                value={selectCompany}
                onChange={(e) => setSelectCompany(e.target.value)}
                className="styleInput"
            >
                <option value="">Select a company</option>
                {names.map((name, index) => (
                    <option className="text-black dark:text-white"
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
                className="styleInput"
            >
                <option value="">Select a Area</option>
                {areas && areas.map((name, index) => (
                    <option className="text-black dark:text-white"
                        key={index}
                        value={name}
                        onClick={() => { setSelectArea(name) }}
                    >
                        {name}
                    </option>
                ))}
            </select>
            <button
                className="buttonGreen mt-4"
                onClick={getEquipments}
            >
                Consult
            </button>
            {responseData &&
                <div>
                    <EquipmentTable equipments={responseData} />
                </div>
            }
        </div>
    );
}

export default EquipmentQuery
