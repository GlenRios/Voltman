'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { getToken } from '@/src/hooks/handleToken';
import User from "@/src/models/User"
import showNotification from '@/src/utilts/Notifications';
import ButtonBack from '@/src/components/buttons/ButtonBack';
import Logo from '@/src/components/logo';
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";

/**
For making branch a select
**/
import { fetchBranchesNames } from '@/src/api/branchService';
/**
For making branch a select
**/

export default function Page() {

    const { showAlert, alertData } = useAlert();
    const token = getToken();
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
    const [branches, setBranches] = useState<string[]>([])

    {/** **/ }
    useEffect(() => { fetchBranches(); }, []);
    const fetchBranches = async () => {
        try {
            const response = await fetch("http://localhost:5050/api/branch/", {
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
            const names = data.map((item:any) => item.Name);
            setBranches(names);
        } catch (Error) {
            console.error(Error)
        }
    };
    {/** **/ }

    useEffect(() => { fetchUsers(); }, []);
    const fetchUsers = async () => {
        try {
            const token = getToken();
            const response = await fetch("http://localhost:5050/api/user/", {
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
            const url = isEdit ? `http://127.0.0.1:5050/api/user/${id}/` : 'http://127.0.0.1:5050/api/user/';
            const response = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
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
                const response = await fetch(`http://127.0.0.1:5050/api/user/${id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
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
        <div className="min-h-screen p-8 relative fondo ">

            <div className='flex justify-center items-center'>
                <Logo
                    width={100}
                    height={100}>
                </Logo>
                <h2 className="tittlePage">
                    User management!
                </h2>
            </div>

            {notification && (
                <div className="mb-4 p-4 h-10 bg-green-100 text-green-700 rounded">
                    {notification}
                </div>
            )}
            <ButtonBack />
            <button
                onClick={() => {
                    setShowForm(true);
                    setIsEdit(false);
                    setName('');
                    setCompany('');
                    setType('');
                    setPassword('');
                }}
                className="buttonBlue"
            >
                Add User

            </button>

            <div className="max-w-md mb-4 mt-6 ml-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="styleInput"
                />
            </div>

            <div className="card">
                <table className="styleTable">
                    <thead>
                        <tr className='headRowTable'>
                            <th className="headColumn">Name</th>
                            <th className="headColumn">Branch</th>
                            <th className="headColumn">Type</th>
                            <th className="headColumn">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="rowTable">
                                    <td className="rowData">{user.Username}</td>
                                    <td className="rowData">{user.Company}</td>
                                    <td className="rowData">{user.Type}</td>
                                    {/* <td className="rowData">{user.Password}</td> */}
                                    <td className="flex  flex-col md:flex-row justify-center gap-1 w-auto">
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="buttonBlue"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="buttonRed"
                                        >
                                            🗑️
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
                <div className="pop">
                    <div className="card">
                        <h2 className="tittle">
                            <Logo
                                width={30}
                                height={30}>
                            </Logo>
                            {isEdit ? "Edit User:" : "Add Usuer:"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label className="subtittle">Name:</label>
                                <input
                                    type="text"
                                    value={Username}
                                    onChange={e => setName(e.target.value)}
                                    className="styleInput"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="subtittle">Password</label>
                                <input
                                    type="password"
                                    value={Password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="styleInput"
                                />
                            </div>
                            {isEdit ?
                                <div className="mb-2">
                                    <label className="subtittle">New Password</label>
                                    <input
                                        type="password"
                                        value={NewPassword}
                                        placeholder="optional"
                                        onChange={e => setNewPassword(e.target.value)}
                                        className="styleInput"
                                    />
                                </div> : <></>}
                            <div className="mb-4">
                                <label className="subtittle">Company</label>
                                {/** Using a select **/}
                                <select
                                    value={Company}
                                    onChange={e => setCompany(e.target.value)}
                                    className="selector"
                                >
                                    <option value="">Select a company</option>
                                    {branches.map((branch) => <option key={branch} value={branch}>{branch}</option>)}
                                </select>
                                {/** Using a select **/}
                            </div>
                            <div className="mb-4">
                                <label className="subtittle">User type</label>
                                <select
                                    value={Type}
                                    onChange={e => setType(e.target.value)}
                                    className="selector"
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
                                    className="buttonRed"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="buttonBlue"
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
