'use client';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import fetchAccesRoute from "../api/accesService";
import { removeToken } from "./handleToken";

export function goHome(router: AppRouterInstance) {
    router.push("/home");
    return;
}

export async function goRestrictedRoute(router: AppRouterInstance, route: string) {
    try {
        const response = await fetchAccesRoute(route)
        if (response) {
            if (route === "log_out") {
                removeToken();
                router.push('/');
                return true;
            }
            router.push(`/home/${route}/`);
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        throw error;
    }
}
