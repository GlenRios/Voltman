'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import React from 'react';
import { getToken } from '@/src/utilts/handleToken';
import User from "@/src/models/User"
import showNotification from '@/src/utilts/Notifications';

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

    const handleRedireccion = () => {
        router.back();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(() => { fetchUsers(); }, []);
    const fetchUsers = async () => {
        try {
            const token = getToken();
            const response = await fetch("http://localhost:5050/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error();
            const data = await response.json();
            // console.log('Usuarios cargados:', data);
            setUsers(data);
        } catch (Error) {
            console.error(Error)
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!Username || !Company || !Type || !Password || !id) {
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
            if (!response.ok) throw new Error(isEdit ? 'Error editing user.' : 'Error adding user.');
            // throw new Error(`Error al guardar usuario: ${response.statusText} (Código: ${response.status})`);
            else {
                const user = await response.json();
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
        if (!confirmed) return;

        try {
            const response = await fetch(`http://127.0.0.1:5050/api/user/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Error deleting user');
            setUsers(users.filter((user) => user.id !== id));
            showNotification('User successfully deleted.', setNotification);
        } catch (Error) {
            console.error(Error)
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
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="object-contain object-center mr-1"
                />
                <h2 className="text-4xl font-extrabold text-center text-black dark:text-white">
                    User management!
                </h2>
            </div>

            {notification && (
                <div className="mb-4 p-4 h-10 bg-green-100 text-green-700 rounded">
                    {notification}
                </div>
            )}

            <button
                className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group scale-75"
                type="button"
                onClick={handleRedireccion}
            >
                <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="25px"
                        width="25px"
                    >
                        <path
                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                            fill="#000000"
                        ></path>
                        <path
                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                            fill="#000000"
                        ></path>
                    </svg>
                </div>
                <p className="translate-x-2">Go Back</p>
            </button>

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
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={30}
                                height={30}
                                className="object-contain object-center mr-1"
                            />
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