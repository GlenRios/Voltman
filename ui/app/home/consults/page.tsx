"use client";
import { useEffect, useState } from 'react';
import TotalConsumption from '@/src/components/consults/TotalConsumption';
import MonthlyAverage from '@/src/components/consults/MonthlyAverage';
import EfficiencyComparison from '@/src/components/consults/EfficiencyComparison';
import ButtonBack from '@/src/components/buttons/ButtonBack';
import Logo from '@/src/components/logo';
import EquipmentQuery from '@/src/components/consults/EquipmentsQuery';
import { fetchBranchesNames } from '@/src/api/branchService';
import { getToken } from '@/src/hooks/handleToken';
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";

interface Query {
    id: number;
    type: string | null;
}

export default function QueriesPage() {

    const { showAlert, alertData } = useAlert();
    const token = getToken();
    const [CompaniesNames, setCompaniesNames] = useState<string[]>([]);
    const [queries, setQueries] = useState<Query[]>([]);

    //Obtener nombres de las sucursales al abrir la pagina
    useEffect(() => { fetchBranches(); }, []);
    const fetchBranches = async () => {
        try {
            const response = await fetch("http://localhost:5050/api/consult/companies/", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) {
                showAlert(true, data.error, 5000)
            }
            const names: string[] = data.map((item: { Name: string;}) => item.Name)
            // Elimina valores vacíos
            setCompaniesNames(names);
            console.log(names);
        } catch (Error) {
            console.error(Error)
        }
    };

    const handleAddQuery = () => {
        setQueries([...queries, { id: Date.now(), type: null }]);
    };

    const handleSelectQuery = (id: number, type: string) => {
        setQueries(
            queries.map((query) =>
                query.id === id ? { ...query, type } : query
            )
        );
    };

    const handleRemoveQuery = (id: number) => {
        setQueries(queries.filter((query) => query.id !== id)); // Eliminar la consulta por ID
    };

    const renderQueryComponent = (type: string | null, id: number) => {
        switch (type) {
            case 'total':
                return <TotalConsumption key={id} names={CompaniesNames}/>;
            case 'average':
                return <MonthlyAverage key={id} />;
            case 'comparison':
                return <EfficiencyComparison key={id} />;
            case 'equipments': <EquipmentQuery key={id} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center fondo">
            {alertData.isVisible && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => showAlert(false, "", 0)}
                />
            )}
            <div className="flex flex-col items-center justify-center">
                <Logo height={200} width={200} />
                <h1 className="text-2xl font-bold mb-4">Consultas de Consumo Energético</h1>
            </div>

            <div>
                <ButtonBack />
            </div>
            {queries.map((query) => (
                <div key={query.id} className="mb-4 p-4 border rounded shadow">
                    <div className="flex justify-between items-center">
                        {!query.type ? (
                            <select
                                className="w-full p-2 border rounded"
                                onChange={(e) => handleSelectQuery(query.id, e.target.value)}
                            >
                                <option value="">Selecciona una consulta</option>
                                <option value="total">Consumo Total</option>
                                <option value="average">Promedio Mensual</option>
                                <option value="comparison">Comparación de Eficiencia</option>
                                <option value="equipments">Mostrar equipos</option>
                                <option value="exceeded">Identificar las sucursales</option>
                            </select>
                        ) : (
                            renderQueryComponent(query.type, query.id)
                        )}
                        <button
                            className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleRemoveQuery(query.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddQuery}
            >
                New
            </button>

        </div>
    );
}