// components/NotificationSidebar.tsx
import React, { useState } from 'react';

interface Notification {
    id: number;
    title: string;
    message: string;
}

const notificationsData: Notification[] = [
    { id: 1, title: 'Consumo Alto', message: 'El consumo eléctrico superó el límite establecido.' },
    { id: 2, title: 'Mantenimiento', message: 'Programado mantenimiento para el próximo lunes.' },
    { id: 3, title: 'Nuevo Usuario', message: 'Se ha registrado un nuevo usuario en el sistema.' },
];

const NotificationSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    const openNotification = (notification: Notification) => {
        setSelectedNotification(notification);
    };

    const closeModal = () => {
        setSelectedNotification(null);
    };

    return (
        <>
            {/* Botón para abrir la barra lateral */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 text-3xl"
            >
                🔔
            </button>

            {/* Barra lateral */}
            <div
                className={`
          fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:block
        `}
            >
                <h2 className="text-2xl mb-4">Notificaciones 🔔</h2>
                <ul>
                    {notificationsData.map((notif) => (
                        <li
                            key={notif.id}
                            onClick={() => openNotification(notif)}
                            className="mb-2 p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
                        >
                            {notif.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* open notification */}
            {selectedNotification && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-600 p-6 rounded-lg shadow-xl w-96 shadow-black">
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
        </>
    );
};

export default NotificationSidebar;
