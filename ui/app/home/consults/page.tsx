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
import TotalCost from '@/src/components/consults/TotalCost';
// import { saveAs } from 'file-saver' //Libreria para descargar archivo
interface Query {
    id: number;
    type: string | null;
}

export default function QueriesPage() {

    const { showAlert, alertData } = useAlert();
    const token = getToken();
    const [CompaniesNames, setCompaniesNames] = useState<string[]>([]);
    const [queries, setQueries] = useState<Query[]>([{ id: Date.now(), type: null }]);
    const [formats, setFormats] = useState<string[]>([]);
    const [selectedFormats, setSelectedFormats] = useState<string>('');

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
                showAlert(true, data.error, 2500)
                return;
            }
            if (data) {
                const names: string[] = data.map((item: { Name: string; }) => item.Name)
                setCompaniesNames(names);
            }
        } catch (error: any) {
            showAlert(true, error.message, 1500);
        }
    };
    // Agregar consulta
    const handleAddQuery = () => {
        setQueries([...queries, { id: Date.now(), type: null }]);
    };
    // Maneja los selectores de las consultas
    const handleSelectQuery = (id: number, type: string) => {
        setQueries(
            queries.map((query) =>
                query.id === id ? { ...query, type } : query
            )
        );
    };
    // Removef consulta
    const handleRemoveQuery = (id: number) => {
        setQueries(queries.filter((query) => query.id !== id)); // Eliminar la consulta por ID
    };
    // Renderizar los componentes de las consultas
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
            case 'cost':
                return <TotalCost key={id} names={CompaniesNames} />
            default:
                return null;
        }
    };
    // obtener lista de formatos
    useEffect(() => {
        const getFormats = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/plugin/", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (!response.ok) {
                    showAlert(true, data.error, 2500)
                    return;
                }
                setFormats(data);
            } catch (error: any) {
                showAlert(true, error.message, 1500);
            }
        }
        getFormats();
    }, []);
    // importar al formato seleccionado
    const importAs = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/plugin/${selectedFormats}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: document.getElementsByClassName("card")[0].outerHTML  })
                //body: JSON.stringify({ data: "<html><body><p>hello wolrd</p></body></html>" })
                //body: JSON.stringify({ data: document.body.outerHTML  })
            });
            if (!response.ok) {
                const data = await response.json();
                showAlert(true, data.error, 2500)
                return;
            }
            // Logica de descarga
            //console.log(document.getElementsByClassName("consult")[0].outerHTML)
            let data = await response.json()
            data = atob(data.data)
            console.log(data)
            // let byteNumbers = new Array(data.length)
            // for(let i=0;i<byteNumbers.length;i++){
            //     byteNumbers[i] = data.charCodeAt(i)
            // }
            // let byteArray = new Uint8Array(byteNumbers)
            // const url = window.URL.createObjectURL(new Blob([data],{type: "application/pdf"}))
            // const link = document.createElement("a")
            // link.href = url
            // link.download = "download.pdf"
            // document.body.appendChild(link)
            // link.click()
            // document.body.removeChild(link)
            // window.URL.revokeObjectURL(url)


            
        } catch (error: any) {
            showAlert(true, error.message, 1500);
        }
    }

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
                    Energy Consumption Consults
                </h2>
            </div>
            <div className='flex flex-row gap-2 scale-90'>
                <ButtonBack />
                {/* <button
                    className="buttonBlue"
                    onClick={handleAddQuery}
                >
                    New
                </button> */}
                <div className='flex flex-row items-center justify-center rounded-lg gap-1'>
                    <select className='selector'
                        onChange={(e) => { setSelectedFormats(e.target.value) }}>
                        <option value="">Select a Format</option>
                        {formats.map((format, index) => (
                            <option key={index} value={format}>{format}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => importAs()}
                        className="w-10 h-10 items-center hover:scale-110 transition-all">
                        <img
                            src="/images/import.png"
                            className="w-full h-full object-contain dark:filter dark:brightness-0 dark:invert"
                        />
                    </button>
                </div>

            </div>

            {queries.map((query) => (
                <div key={query.id} className={`card  ${query.type ? 'w-full lg:w-3/4 m-10' : ''}`} >
                    <div className={`flex items-center ${query.type ? 'flex-col' : 'flex-row'}`}>
                        {!query.type ? (
                            <select
                                className="selector w-full"
                                onChange={(e) => handleSelectQuery(query.id, e.target.value)}
                            >
                                <option value="">Select a query</option>
                                <option value="total">Total consumption</option>
                                <option value="cost">Total Cost</option>
                                <option value="average">Monthly average</option>
                                <option value="comparison">Efficiency comparison</option>
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