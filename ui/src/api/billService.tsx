import { getToken } from '@/src/hooks/handleToken';

export default async function submitBills(formularios: any[]) {
    const token = getToken();
    try {
        return await fetch("http://localhost:5050/api/bill/", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formularios),
        });
    }
    catch(error){
        throw error;
    }
}
