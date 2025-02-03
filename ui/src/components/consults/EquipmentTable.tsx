import Equipment from '@/src/models/Equipments';

export interface EquipmentTableProp {
    equipments : Equipment[]
}

const EquipmentTable: React.FC<EquipmentTableProp> = ({equipments}) => {
    
    return (
        <div className="p-4">
            <h2 className="subtittle text-xl">Equipments Info:</h2>
                <div className="overflow-x-auto">
                    <table className="styleTable overflow-x-auto">
                        <thead>
                            <tr className="headRowTable">
                                <th className="headColumn">Area</th>
                                <th className="headColumn">Brand</th>
                                <th className="headColumn">Model</th>
                                <th className="headColumn">Type</th>
                                <th className="headColumn">Nominal Capacity (kw)</th>
                                <th className="headColumn">Installation Date</th>
                                <th className="headColumn">Estimated Lifespan</th>
                                <th className="headColumn">Mantenance Status</th>
                                <th className="headColumn">Critical Energy System</th>
                                <th className="headColumn">Usage Frequency</th>
                                <th className="headColumn">Energy Efficiency</th>
                                <th className="headColumn">Average Daily Consumption (kw)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipments.map((item, index) => (
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
                                    <td className="rowData">{Math.abs(item.Average_Daily_Consumption)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default EquipmentTable;