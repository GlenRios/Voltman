"use client"
import Branch from "../models/Branch";
import { getToken } from "../hooks/handleToken";

// export async function submitBranchService(token: string, isEdit: boolean, data: Branch, id?: number) {

//     try {
//         if (!token) {
//             throw new Error("Please login");
//         }
//         const url = isEdit ? `http://127.0.0.1:5050/api/branch/${id}` : 'http://127.0.0.1:5050/api/branch';
//         const response = await fetch(url, {
//             method: isEdit ? 'PUT' : 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         }
//         );
//         const branch = await response.json();
//         if (!response.ok) {
//             throw new Error(branch.error);
//         }
//         else {
//             return branch;
//         }
//     }
//     catch (error) {
//         throw error;
//     }
// }

// export async function deleteBranchService(token: string, id: number) {

//     try {
//         if (!token) {
//             throw new Error("Please login");
//         }
//         else {
//             const response = await fetch(`http://localhost:5050/api/branch`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error(data.error);
//             }
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

export async function fetchBranchesNames(){
    try {
        return await fetch("http://localhost:5050/api/consult/companies/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        throw error;
    }
};
