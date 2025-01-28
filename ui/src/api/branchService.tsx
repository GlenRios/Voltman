"use client"
import Branch from "../models/Branch";
import { getToken } from "../hooks/handleToken";


export async function fetchBranchesNames(){
    try {
		let response = await fetch("http://localhost:5050/api/consult/companies/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
		const data = await response.json();
		return data.map( (branch: { Name: any; }) => branch.Name);
			
    } catch (error) {
        throw error;
    }
};
