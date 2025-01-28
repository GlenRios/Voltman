
export default async function submitBills(formularios: any[]) {
    try {
        return await fetch("http://localhost:5050/api/bill/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formularios),
        });
    }
    catch(error){
        throw error;
    }
}