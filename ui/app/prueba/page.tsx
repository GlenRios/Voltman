"use client";
import React from "react";
import { useAlert } from "@/src/hooks/alertContxt"; 
import Alert from "@/src/components/Alert";

export default function HomePage() {
  const { showAlert, alertData } = useAlert();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Next.js Alert Example</h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4"
        onClick={() => showAlert(false, "Operation was successful!", 3000)}
      >
        Show Success
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
        onClick={() => showAlert(true, "Something went wrong!", 5000)}
      >
        Show Error
      </button>

      {alertData.isVisible && (
        <Alert
          type={alertData.type}
          message={alertData.message}
          onClose={() => showAlert(false, "", 0)} // Ocultar alerta
        />
      )}
    </main>
  );
}
