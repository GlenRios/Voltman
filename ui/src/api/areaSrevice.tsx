"use client"
import Area from "../models/Areas";

export async function fetchAreasService(token: string, branch: string): Promise<Area[]> {
    try {
        const response = await fetch(`http://localhost:5050/api/area/${branch}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
        }
        const data: Area[] = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}

export async function submitAreaService(token: string, isEdit: boolean, data: Area, id?: number) {

    try {
        if (!token) {
            throw new Error("Please login");
        }
        const url = isEdit ? `http://127.0.0.1:5050/api/area/${id}` : 'http://127.0.0.1:5050/api/area';
        const response = await fetch(url, {
            method: isEdit ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        );
        const branch = await response.json();
        if (!response.ok) {
            throw new Error(branch.error);
        }
        else {
            return branch;
        }
    }
    catch (error) {
        throw error;
    }
}

export async function deleteAreaService(token: string, id: number) {

    try {
        if (!token) {
            throw new Error("Please login");
        }
        else {
            const response = await fetch(`http://localhost:5050/api/area`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error);
            }
        }
    } catch (error) {
        throw error;
    }
}