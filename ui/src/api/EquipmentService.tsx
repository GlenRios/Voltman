import { getToken } from "../hooks/handleToken";

export async function fetchEquipments(branch: string, area: string) {
    const token = getToken();

    try {
        return await fetch(`http://localhost:5050/api/consult/equipments/${branch}/${area}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        throw error;
    }
}
