'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { getToken } from '@/src/hooks/handleToken';
import User from "@/src/models/User"
import showNotification from '@/src/utilts/Notifications';
import buttonBack from '@/src/components/buttons';
import { goHome } from '@/src/hooks/handleRouts';
import logo from '@/src/components/logo';

export default function Page() {

    const [users, setUsers] = useState<User[]>([]);
    const [Username, setName] = useState('');
    const [Company, setCompany] = useState('');
    const [Type, setType] = useState('');
    const [notification, setNotification] = useState<string | null>(null);
    const [Password, setPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setCurrentUserId] = useState<number | null>(null);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => { fetchUsers(); }, []);
    const fetchUsers = async () => {
        try {
            const token = getToken();
            const response = await fetch("http://localhost:5050/api/user", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            // console.log('Usuarios cargados:', data);
            setUsers(data);
        } catch (Error) {
            console.error(Error)
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!Username || !Company || !Type || !Password) {
            showNotification('Please complete all fields.', setNotification);
            return;
        }
        try {
            const url = isEdit ? `http://127.0.0.1:5050/api/user/${id}` : 'http://127.0.0.1:5050/api/user';
            const response = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(isEdit ? { id, Username, Company, Type, Password, NewPassword }
                    : { id, Username, Company, Type, Password })
            }
            );
            const user = await response.json();
            if (!response.ok) throw new Error(user.error);
            // throw new Error(`Error al guardar usuario: ${response.statusText} (Código: ${response.status})`);
            else {
                if (isEdit) {
                    setUsers(users.map((u) => (u.id === id ? user : u)));
                } else {
                    setUsers([...users, user]);
                }
                showNotification(isEdit ? 'User successfully updated.' : 'User successfully added.', setNotification);
                resetForm();
            }
        } catch (Error) {
            console.error(Error)
        }
    };
    const handleDeleteUser = async (id: number) => {
        const confirmed = window.confirm('Are you sure you want to delete the user?');
        if (confirmed) {
            try {
                const response = await fetch(`http://127.0.0.1:5050/api/user/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Error deleting user');
                setUsers(users.filter((user) => user.id !== id));
                showNotification('User successfully deleted.', setNotification);
            } catch (Error) {
                console.error(Error)
            }
        }
    };

    const handleEditUser = (user: User) => {
        setName(user.Username);
        setCompany(user.Company);
        setType(user.Type);
        setPassword('')
        setNewPassword('');
        setCurrentUserId(user.id);
        setIsEdit(true);
        setShowForm(true);
    };

    const resetForm = () => {
        setName('');
        setCompany('');
        setType('');
        setPassword('');
        setNewPassword('');
        setCurrentUserId(null);
        setIsEdit(false);
        setShowForm(false);
    };

    const filteredUsers = users.filter((user) =>
        user.Username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen p-8 relative bg-[url('http://localhost:3000/images/claro3.jpg')] dark:bg-[url('http://localhost:3000/images/oscuro2.jpg')] bg-cover bg-no-repeat bg-center bg-fixed ">

            <div className='flex justify-center items-center'>
                {logo(50, 50)}
                <h2 className="text-4xl font-extrabold text-center text-black dark:text-white">
                    User management!
                </h2>
            </div>

            {notification && (
                <div className="mb-4 p-4 h-10 bg-green-100 text-green-700 rounded">
                    {notification}
                </div>
            )}

            {buttonBack(() => goHome(router))}

            <button
                onClick={() => {
                    setShowForm(true);
                    setIsEdit(false);
                    setName('');
                    setCompany('');
                    setType('');
                    setPassword('');
                }}
                className="mb-4 bg-blue-500 h-10 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
                Add User

            </button>

            <div className="max-w-md mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-300 dark:placeholder:text-black dark:text-black"
                />
            </div>

            <div className="overflow-x-auto bg-slate-100 shadow-md rounded shadow-zinc-700 dark:shadow">
                <table className="min-w-full border-3">
                    <thead className="bg-gray-600 dark:bg-black text-white ">
                        <tr>
                            <th className="px-4 py-2 border-2 border-zinc-700">Name</th>
                            <th className="px-4 py-2 border-2 border-zinc-700">Branch</th>
                            <th className="px-4 py-2 border-2 border-zinc-700">Type</th>
                            {/* <th className="px-4 py-2 border-2 border-zinc-700">Password</th> */}
                            <th className="px-4 py-2 border-2 border-zinc-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="bg-slate-100 hover:bg-slate-300 dark:hover:bg-gray-400 text-zinc-700 dark:bg-gray-200">
                                    <td className="px-4 py-2 border-2 border-zinc-700">{user.Username}</td>
                                    <td className="px-4 py-2 border-2 border-zinc-700">{user.Company}</td>
                                    <td className="px-4 py-2 border-2 border-zinc-700">{user.Type}</td>
                                    {/* <td className="px-4 py-2 border-2 border-zinc-700">{user.Password}</td> */}
                                    <td className="px-3 py-2 border-2 border-zinc-700 justify-center">
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="p-6 w-full max-w-md bg-white dark:bg-black shadow-2xl rounded-2xl overflow-hidden border-4 border-transparent dark:border-zinc-700">
                        <h2 className="text-2xl font-semibold mb-4 ">
                            {logo(30, 30)}
                            {isEdit ? "Editar Usuario" : "Agregar Usuario"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-white">Name</label>
                                <input
                                    type="text"
                                    value={Username}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black dark:bg-slate-200"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    value={Password}
                                    placeholder='insert the password'
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black dark:bg-slate-200 placeholder:text-gray-700"
                                />
                            </div>
                            {isEdit ?
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-white">New Password</label>
                                    <input
                                        type="password"
                                        value={NewPassword}
                                        placeholder="optional"
                                        onChange={e => setNewPassword(e.target.value)}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black dark:bg-slate-200 placeholder:text-gray-700"
                                    />
                                </div> : <></>}
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-white">Company</label>
                                <input
                                    type="text"
                                    value={Company}
                                    onChange={e => setCompany(e.target.value)}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black dark:bg-slate-200"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-white">User type</label>
                                <select
                                    value={Type}
                                    onChange={e => setType(e.target.value)}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black dark:bg-slate-300"
                                >
                                    <option value="">Select a type</option>
                                    <option value="Analyst">Analyst</option>
                                    <option value="Manacher">Manacher</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={resetForm}
                                    type="button"
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}