'use client';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import fetchAccesRoute from "../api/accesService";
import { getToken } from "./handleToken";
import { MouseEventHandler } from "react";

export function goHome(router: AppRouterInstance) {
    router.push("/home");
    return;
}

export async function goRestrictedRoute(router: AppRouterInstance, route: string) {
    try {
        const response = await fetchAccesRoute(route)
        if (response) {
            router.push(`/home/${route}`);
            return;
        }
        throw new Error(`error accessing ${route}`);
    } catch (error) {
        throw error;
    }
}