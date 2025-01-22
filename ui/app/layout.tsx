import React from "react";
import { AlertProvider } from "@/src/hooks/alertContxt"; 
import "./globals.css"; // Tus estilos globales

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AlertProvider>
          {children}
        </AlertProvider>
      </body>
    </html>
  );
}
