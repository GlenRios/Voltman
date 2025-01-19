import { getToken } from "../hooks/handleToken";

export default async function fetchAccesRoute(route: string): Promise<boolean> {
    try {
        const token = getToken();
        const response = await fetch("http://localhost:5050/api/acces/route", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ route: route })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return true;
    }
    catch (error) {
        throw error;
    }
}