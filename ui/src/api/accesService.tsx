import { getToken } from "../hooks/handleToken";

export default async function fetchAccesRoute(route: string): Promise<boolean> {
    try {
        const token = getToken();
        const response = await fetch(`http://localhost:5050/api/access/${route}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            return false;
        }
        return true;
    }
    catch (error) {
        throw error;
    }
}
