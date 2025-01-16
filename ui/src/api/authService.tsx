'use client';
import Cookies from "js-cookie";

export async function login(Username: string, Password: string):Promise<boolean>{
    try {
        const response = await fetch("http://localhost:5050/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Username: Username, Password: Password }),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = `Error ${response.status}: ${data.error}`;
            throw new Error(errorMessage || "Undefined Error");
        }

        Cookies.set("token", data.token, {
            expires: 1, // Duración de 1 día
            secure: process.env.NODE_ENV === "production", // HTTPS en producción
            sameSite: "Strict", // Protección contra CSRF
        });

        return true;

    } catch (error) {
        // console.error(error);
        // alert("Error connecting to the server");
        throw error; // Throw the error to be handled by the code above
    }
}

export async function logout():Promise<boolean>{
    return true
}