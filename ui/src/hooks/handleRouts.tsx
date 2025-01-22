'use client';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import fetchAccesRoute from "../api/accesService";
import { removeToken } from "./handleToken";
import { MouseEventHandler } from "react";

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
                return;
            }
            router.push(`/home/${route}`);
            return;
        }
        else{
            router.push("/");
        }
        // throw new Error(`error accessing ${route}`);
    } catch (error) {
        throw error;
    }
}