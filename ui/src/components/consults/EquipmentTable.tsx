import React, { useState, useEffect } from 'react';
import { fetchEquipments } from '@/src/api/EquipmentService';
import Equipment from '@/src/models/Equipments';

export interface EquipmentTableProp {
    branch: string,
    area: string
}

const EquipmentTable: React.FC<EquipmentTableProp> = ({ branch, area }) => {
    const [data, setData] = useState<Equipment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await fetchEquipments(branch, area)
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result: Equipment[] = await response.json();
                setData(result);
            }
            catch (error) {
                alert(error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="subtittle text-xl">Equipments Info:</h2>

            {isLoading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="styleTable">
                        <thead>
                            <tr className="headRowTable">
                                <th className="headColumn">Area</th>
                                <th className="headColumn">Brand</th>
                                <th className="headColumn">Model</th>
                                <th className="headColumn">Type</th>
                                <th className="headColumn">Nominal Capacity</th>
                                <th className="headColumn">Installation Date</th>
                                <th className="headColumn">Estimated Lifespan</th>
                                <th className="headColumn">Mantenance Status</th>
                                <th className="headColumn">Critical Energy System</th>
                                <th className="headColumn">Usage Frequency</th>
                                <th className="headColumn">Energy Efficiency</th>
                                <th className="headColumn">Average Daily Consumption</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="rowTable">
                                    <td className="rowData">{item.Area}</td>
                                    <td className="rowData">{item.Brand}</td>
                                    <td className="rowData">{item.Model}</td>
                                    <td className="rowData">{item.Type}</td>
                                    <td className="rowData">{item.Nominal_Capacity}</td>
                                    <td className="rowData">{item.Installation_Date}</td>
                                    <td className="rowData">{item.Estimated_Lifespan}</td>
                                    <td className="rowData">{item.Maintenance_Status}</td>
                                    <td className="rowData">{item.CriticalEnergySystem}</td>
                                    <td className="rowData">{item.Usage_Frequency}</td>
                                    <td className="rowData">{item.Energy_Efficiency}</td>
                                    <td className="rowData">{item.Average_Daily_Consumption}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EquipmentTable;