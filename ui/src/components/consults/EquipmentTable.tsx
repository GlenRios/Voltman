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
            <h2 className="text-2xl font-bold mb-4">Equuipments Table</h2>

            {isLoading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th className="p-2 border">Area</th>
                                <th className="p-2 border">Brand</th>
                                <th className="p-2 border">Model</th>
                                <th className="p-2 border">Type</th>
                                <th className="p-2 border">Nominal Capacity</th>
                                <th className="p-2 border">Installation Date</th>
                                <th className="p-2 border">Estimated Lifespan</th>
                                <th className="p-2 border">Mantenance Status</th>
                                <th className="p-2 border">Critical Energy System</th>
                                <th className="p-2 border">Usage Frequency</th>
                                <th className="p-2 border">Energy Efficiency</th>
                                <th className="p-2 border">Average Daily Consumption</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                    <td className="p-2 border">{item.Area}</td>
                                    <td className="p-2 border">{item.Brand}</td>
                                    <td className="p-2 border">{item.Model}</td>
                                    <td className="p-2 border">{item.Type}</td>
                                    <td className="p-2 border">{item.Nominal_Capacity}</td>
                                    <td className="p-2 border">{item.Installation_Date}</td>
                                    <td className="p-2 border">{item.Estimated_Lifespan}</td>
                                    <td className="p-2 border">{item.Maintenance_Status}</td>
                                    <td className="p-2 border">{item.CriticalEnergySystem}</td>
                                    <td className="p-2 border">{item.Usage_Frequency}</td>
                                    <td className="p-2 border">{item.Energy_Efficiency}</td>
                                    <td className="p-2 border">{item.Average_Daily_Consumption}</td>
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