'use client'
import React, { useEffect, useState } from "react"
import { Branch, BranchProps } from "@/src/components/branches";
import { fetchBranches } from "@/src/api/branchService";
import Cookies from "js-cookie";
import Boton from "@/src/components/buttons";

// eslint-disable-next-line @next/next/no-async-client-component
export default function branchesPage() {

    const cookie: string | undefined = Cookies.get("token");
    const [branches, setBranches] = useState<BranchProps[]>([]); // Lista de sucursales
    const [selectedBranch, setSelectedBranch] = useState<string>(''); // Sucursal seleccionada

    // useEffect(() => {
    //     setBranches(fetchBranches(cookie));
    // }, [cookie]);

    const handleSelectBranch = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBranch(event.target.value); // Actualiza la sucursal seleccionada
    };

    const addBranch = () => {

    }

    const Branch = () => {

    }


    return (
        <main className="page">
            <div className="p-4">
                <div className="p-4">
                    <div className="flex flex-col items-center gap-4 p-4">
                        <label htmlFor="branch-selector" className="text-lg font-semibold">
                            Selecciona una sucursal:
                        </label>
                        <select
                            id="branch-selector"
                            value={selectedBranch}
                            onChange={handleSelectBranch}
                            className="border border-gray-300 rounded p-2 text-lg"
                        >
                            <option value="">Selecciona una sucursal</option>
                            {branches.map((branch, index) => (
                                <option key={index} value={branch.name}>
                                    {branch.name} - {branch.address}
                                </option>
                            ))}
                        </select>
                        {selectedBranch && (
                            <p className="text-green-500 font-medium">
                                Sucursal seleccionada: {selectedBranch}
                            </p>
                        )}
                    </div>
                    {Boton("New", "green", addBranch)}
                    {Boton("Delete", "red", addBranch)}
                </div>
            </div>
        </main>
    );
}