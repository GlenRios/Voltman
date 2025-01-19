import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define las rutas protegidas
const protectedRoutes = [
  "/home",
  "/home/users",
  "/home/bills",
  "/home/consults",
  "/home/branches",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Si intenta acceder a una ruta protegida sin token, redirige al login
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

// Aplica el middleware solo a las rutas necesarias
export const config = {
  matcher: [
    "/home",
    "/home/users",
    "/home/bills",
    "/home/consults",
    "/home/branches",
  ],
};
