'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '@/src/utilts/handleToken';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';

export default function Home() {

    interface Notification {
        id: number;
        title: string;
        message: string;
    }


    //Variables
    const [receiveNotifications, setReceiveNotifications] = useState(true);
    const router = useRouter();

    const notificationsData: Notification[] = [
        { id: 1, title: 'Consumo Alto', message: 'El consumo eléctrico superó el límite establecido.' },
        { id: 2, title: 'Mantenimiento', message: 'Programado mantenimiento para el próximo lunes.' },
        { id: 3, title: 'Nuevo Usuario', message: 'Se ha registrado un nuevo usuario en el sistema.' },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    const openNotification = (notification: Notification) => {
        setSelectedNotification(notification);
    };

    const closeModal = () => {
        setSelectedNotification(null);
    };

    //Methods:
    const branches = async () => {
        try {
            const token = getToken();
            const response = await fetch("http://localhost:5050/api/router/branches", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error desconocido');
            }
            router.push("/branches");
            return;
        }
        catch (error) {
            console.error(error);
        }
    };

    const users = async () => {
        try {
            const token = getToken();
            const response = await fetch("http://localhost:5050/api/router/users", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.error || 'Error desconocido');
            // }

            router.push("/home/users");
        } catch (error) {
            console.error(error);
        }
    };
    const register = async () => {
        try {
            const token = getToken();
            const response = await fetch("http://localhost:5050/api/router/register", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error desconocido');
            }
            router.push("/branches");
            return;
        }
        catch (error) {
            console.error(error);
        }
    };
    const consult = async () => {
        router.push("/home/consult");
    };
    const exit = async () => {
        try {
            const token = getToken();
            const response = await fetch("http://localhost:5050/api/user/logout", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                // const errorData = await response.json();
                throw new Error('Error desconocido');
            }
            removeToken();
            router.back();
            return;
        }
        catch (error) {
            console.error(error);
        }
    };




    return (
        <div className="flex h-screen flex-col lg:flex-row">

            {/* Barra lateral */}
            {isOpen && <div className="flex flex-col w-full lg:w-auto bg-gray-800 text-white overflow-y-auto">
                <div className='flex items-center justify-center border-2 border-gray-900 p-2 pl-0'>
                    <h3 className='text-3xl'>Alerts 📢</h3>
                </div>
                <div className="p-4 overflow-y-auto border-2 border-gray-900">
                    <ul>
                        {notificationsData.map((notification) => (
                            <li
                                key={notification.id}
                                className="mb-2 flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded"
                            >
                                <span onClick={() => openNotification(notification)}>🔔 {notification.title}</span>
                                {/* <button onClick={() => handleDeleteNotification(notification.id)}>
                                    <FaTrash className="text-red-500 hover:text-red-700" />
                                </button> */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>}
            {/* Contenido principal */}
            <div className="flex-1 flex flex-col dark:bg-gray-900">
                {/* Botón para abrir la barra lateral */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed top-8 right-8 z-50 text-3xl"
                >
                    <img
                        src="/images/alert.png"
                        alt={"alert".charAt(0).toUpperCase() + "alert".slice(1)}
                        className="w-10 h-10 object-contain"
                    />
                </button>
                {/* Parte superior */}
                <div className="flex items-center justify-center flex-col h-5/6 
                                bg-[url('http://localhost:3000/images/claro.jpg')] 
                                dark:bg-[url('http://localhost:3000/images/oscuro2.jpg')] 
                                bg-cover shadow-md dark:shadow-2xl shadow-white">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={200}
                        height={200}
                        className="object-contain object-center mr-1"
                    />
                    <div className="text-center p-12 text-black dark:text-white">
                        <h1 className="text-4xl font-bold mb-4 ">Welcome to Voltman! ⚡</h1>
                        <p className="m-4 text-lg">Monitor, analyze, and optimize energy usage!<br />
                            To learn how to use Voltman, check the user guide by clicking the button below.
                            <button
                                // onClick={}
                                className="text-4xl m4 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform">
                                🔎
                            </button>
                        </p>
                    </div>
                </div>

                {/* Parte inferior */}
                <div className="flex justify-around items-center bg-transparent p-10 text-white">
                    {[{ name: 'consult', detail: "Consults", method: consult },
                    { name: 'register', detail: "Register", method: register },
                    { name: 'users', detail: "Users", method: users },
                    { name: 'branches', detail: "Branches", method: branches },
                    { name: 'exit', detail: "log out", method: exit }].map((item, index) => (
                        <button
                            key={index}
                            onClick={item.method}
                            className="w-24 h-24 bg-transparent transform transition-all duration-200 hover:scale-125 text-black dark:text-white">
                            <img
                                src={`/images/${item.name}.png`}
                                alt={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                className="w-full h-full object-contain dark:filter dark:brightness-0 dark:invert"
                            />
                            {item.detail}
                        </button>
                    ))}
                </div>
            </div>

            {/* open notification */}
            {selectedNotification && (
                <div className="fixed inset-0 bg-black bg-opacity-50 
                                    flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-600 p-6 
                                    rounded-lg shadow-xl w-96 shadow-black">
                        <h3 className="text-xl font-semibold mb-2">{selectedNotification.title}</h3>
                        <p className="mb-4">{selectedNotification.message}</p>
                        <button
                            onClick={closeModal}
                            className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};