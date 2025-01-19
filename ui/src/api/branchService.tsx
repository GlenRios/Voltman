"use client"
import { useState } from "react";
import { BranchProps } from "../components/branches";

export async function fetchBranches(token: string | undefined): Promise<BranchProps[]> {
    try {
        if (!token) {
            throw new Error("Please login");
        }
        else {
            const response = await fetch(`/api/branches/${token}`, {
                method: 'GET'
            });
            const data: BranchProps[] = await response.json();
            return (data);
        }
    } catch (error) {
        console.error('Error al obtener las sucursales:', error);
    } 
    return []
}

// const fetchBranches = async () => {
//     try {
//       const response = await fetch('/api/branches'); // Endpoint del backend
//       const data = await response.json(); // Obtiene el JSON
//       setBranches(data); // Actualiza la lista
//     } catch (error) {
//       console.error('Error al obtener las sucursales:', error);
//     }
//   };