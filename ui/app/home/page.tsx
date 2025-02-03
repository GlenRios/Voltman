'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { goRestrictedRoute } from '@/src/hooks/handleRouts';
import Notification from '@/src/models/Notification';
import Logo from '@/src/components/logo';
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";
import { getToken } from '@/src/hooks/handleToken';

export default function Home() {

    //Variables
    const token = getToken();
    const router = useRouter();
    const { showAlert, alertData } = useAlert();
    const [notificationsData, setNotificationsData] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const buttons = [{ name: 'Consult', route: 'consults' },
    { name: 'Register', route: 'bills' },
    { name: 'Users', route: 'users' },
    { name: 'Branches', route: 'branches' },
    { name: 'Log out', route: 'log_out' }
    ];
    // Obtener lista de alertas
    const fetchAlerts = async () => {
        try {
            const response: any = getToken();
            return await fetch("http://localhost:5050/api/consult/alerts/", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const data = response.json();
                showAlert(true, data.error, 2500);
                return;
            }
            const data: Notification[] = await response.json();
            setNotificationsData(data);
        } catch (error: any) {
            showAlert(true, error.message, 2500);
        }
    }
    // Eliminar una notificacion
    function handleDeleteNotification(id: number): void {
        throw new Error('Function not implemented.');
    }
    // Abrir una pagina
    const goRoute = async (route: string) => {
        try {
            if (await goRestrictedRoute(router, route)) {
                return;
            }
            showAlert(true, "You do not have access to that page", 3500);
            return;
        }
        catch (error: any) {
            showAlert(true, error.message, 5000);
        }
    };

    return (
        <div className="flex h-screen flex-col lg:flex-row">
            {alertData.isVisible && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => showAlert(false, "", 0)}
                />
            )}
            {/* Barra lateral */}
            {isOpen && <div className="flex flex-col w-full lg:w-auto bg-gray-800 text-white overflow-y-auto">
                <div className='flex items-center justify-center border-2 border-gray-900 p-2 pl-0'>
                    <h3 className='text-3xl'>Alerts 📢</h3>
                </div>
                <div className="p-4 overflow-y-auto border-2 border-gray-900">
                    <ul>
                        {notificationsData.map((notification, index) => (
                            <li
                                key={index}
                                className="mb-2 flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded"
                            >
                                <h2>{notification.Bool ? '🔔' : ''}{notification.Name}</h2>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>}

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col dark:bg-gray-900">
                {/* Botón para abrir la barra lateral */}
                <button
                    onClick={() => {
                        !isOpen ? fetchAlerts() : {};
                        setIsOpen(!isOpen)
                    }}
                    className="flex flex-col fixed top-8 right-8 z-50 items-center justify-center group"
                >
                    <img
                        src="/images/alert.png"
                        alt={"alert".charAt(0).toUpperCase() + "alert".slice(1)}
                        className="w-10 h-10 object-contain transition-transform duration-300"
                    />
                    <span className="absolute -top-8 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg">
                        Show Alerts
                    </span>
                </button>
                {/* Parte superior */}
                <div className="flex items-center justify-center flex-col h-5/6 bg-[url('http://localhost:3000/images/claro.jpg')] 
//                              dark:bg-[url('http://localhost:3000/images/oscuro2.jpg')] bg-cover shadow-md dark:shadow-2xl shadow-white">
                    <Logo
                        width={200}
                        height={200}>
                    </Logo>
                    <div className="text-center p-12 text-black dark:text-white">
                        <h1 className="text-4xl font-bold mb-4 ">Welcome to Voltman! ⚡</h1>
                        <p className="m-4 text-lg">Monitor, analyze, and optimize energy usage!<br />
                            To learn how to use Voltman, check the user guide by clicking the button below.
                            <button
                                onClick={() => { }}
                                className="text-4xl m4 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform">
                                🔎
                            </button>
                        </p>
                    </div>
                </div>

                {/* Parte inferior */}
                <div className="flex justify-around items-center bg-transparent p-10 text-white">
                    {buttons.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => goRoute(item.route)}
                            className="w-24 h-24 bg-transparent transform transition-all duration-200 hover:scale-125 text-black dark:text-white">
                            <img
                                src={`/images/${item.name}.png`}
                                className="w-full h-full object-contain dark:filter dark:brightness-0 dark:invert"
                            />
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};