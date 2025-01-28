import { getToken } from "../hooks/handleToken";

export async function fetchEquipments(branch: string, area: string) {

    try {
        return await fetch(`http://localhost:5050/api/consult/${branch}/${area}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        throw error;
    }
}