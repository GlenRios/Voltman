"use client";
import { useEffect, useState } from "react";
import EquipmentTable, { EquipmentTableProp } from "./EquipmentTable";
import { fetchBranchesNames } from "@/src/api/branchService";


const EquipmentQuery: React.FC = () => {


    const [branchesNames, setbranchesNames] = useState<string[]>([]);

    useEffect(() => { fetchUsers(); }, []);
    const fetchUsers = async () => {
        try {

            const response = await fetchBranchesNames();
            const data = await response.json();
            if (!response.ok){
                
            }
            setbranchesNames(data);
        } catch (Error) {
            console.error(Error)
        }
    };



    const [formData, setFormData] = useState<EquipmentTableProp>({
        branch: '',
        area: ' ',
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;

    };

    const handleSubmit = () => {

    };



    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Promedio Mensual</h2>
            <div className="grid grid-cols-1 gap-4">
                <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="">Selecciona una sucursal</option>
                    <option value="Branch1">Sucursal 1</option>
                    <option value="Branch2">Sucursal 2</option>
                </select>
                <input
                    type="text"
                    name="years"
                    placeholder="Años (ej: 2021, 2022, 2023)"
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
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