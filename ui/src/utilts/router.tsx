'use client';
import { getToken } from "./handleToken";
import { useRouter } from "next/navigation";

export function home() {
    const router = useRouter();
    router.push("/home");
    return;
}

export async function branches() {
    try {
        const token = getToken();
        const response = await fetch("http://localhost:5050/api/router/branches", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido');
        }
        const router = useRouter();
        router.push("/branches");
        return;
    }
    catch (error) {
        console.error(error);
    }
}

export async function users() {
    try {
        const token = getToken();
        const response = await fetch("http://localhost:5050/api/router/users", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido');
        }
        const router = useRouter();
        router.push("/branches");
        return;
    }
    catch (error) {
        console.error(error);
    }
}

export async function register() {
    try {
        const token = getToken();
        const response = await fetch("http://localhost:5050/api/router/register", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido');
        }
        const router = useRouter();
        router.push("/branches");
        return;
    }
    catch (error) {
        console.error(error);
    }
}

export async function consult() {

}

export async function exit() {
    try {
        const token = getToken();
        const response = await fetch("http://localhost:5050/api/user/logout", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });
        // if (!response.ok) {
        //     const errorData = await response.json();
        //     throw new Error(errorData.error || 'Error desconocido');
        // }
        const router = useRouter();
        router.push("/");
        return;
    }
    catch (error) {
        console.error(error);
    }
}
// export function enroute(root: string) {
//     if (root === "home") {

//     }
//     else if (root === "users") {

//     }
//     else if (root === "branches") {

//     }
//     else if (root === "exit") {

//     }
//     else {

//     }
//     return;
// }