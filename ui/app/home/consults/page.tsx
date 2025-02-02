"use client";
import { useEffect, useState } from 'react';
import TotalConsumption from '@/src/components/consults/TotalConsumption';
import MonthlyAverage from '@/src/components/consults/MonthlyAverage';
import EfficiencyComparison from '@/src/components/consults/EfficiencyComparison';
import ButtonBack from '@/src/components/buttons/ButtonBack';
import Logo from '@/src/components/logo';
import EquipmentQuery from '@/src/components/consults/EquipmentsQuery';
import { getToken } from '@/src/hooks/handleToken';
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";
import OverLimitConsult from '@/src/components/consults/OverLimitConsult';
import ConsumptionPrediction from '@/src/components/consults/ConsumptionPrediction';

interface Query {
    id: number;
    type: string | null;
}

export default function QueriesPage() {

    const { showAlert, alertData } = useAlert();
    const token = getToken();
    const [CompaniesNames, setCompaniesNames] = useState<string[]>([]);
    const [queries, setQueries] = useState<Query[]>([{ id: Date.now(), type: null }]);

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
            const names: string[] = data.map((item: { Name: string; }) => item.Name)
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
                return <TotalConsumption key={id} names={CompaniesNames} />;
            case 'average':
                return <MonthlyAverage key={id} names={CompaniesNames} />;
            case 'comparison':
                return <EfficiencyComparison key={id} names={CompaniesNames} />;
            case 'equipments':
                return <EquipmentQuery key={id} names={CompaniesNames} />;
            case 'exceeded':
                return <OverLimitConsult key={id} />;
            case 'prediction':
                return <ConsumptionPrediction key={id} names={CompaniesNames} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4 relative fondo">
            {alertData.isVisible && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => showAlert(false, "", 0)}
                />
            )}
            <div className='flex justify-center items-center p-4 m-4'>
                <Logo
                    width={100}
                    height={100}>
                </Logo>
                <h2 className="tittlePage">
                    Energy Consumption Consultations
                </h2>
            </div>
            <div className='scale-90'>
                <ButtonBack />
            </div>
            {queries.map((query) => (
                <div key={query.id} className="card w-full lg:w-3/4 m-10">
                    <div className={`flex justify-between items-center ${query.type ? 'flex-col' : 'flex-row'}`}>
                        {!query.type ? (
                            <select
                                className="selector"
                                onChange={(e) => handleSelectQuery(query.id, e.target.value)}
                            >
                                <option value="">Select a query</option>
                                <option value="total">Total Consumption</option>
                                <option value="average">Monthly Average</option>
                                <option value="comparison">Efficiency Comparison</option>
                                <option value="equipments">Show equipments</option>
                                <option value="exceeded">Identify branches</option>
                                <option value="prediction">Predict consumption</option>
                            </select>
                        ) : (
                            renderQueryComponent(query.type, query.id)
                        )}
                        <button
                            className="buttonRed m-2"
                            onClick={() => handleRemoveQuery(query.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            <button
                className="buttonBlue"
                onClick={handleAddQuery}
            >
                New
            </button>

        </div>
    );
}