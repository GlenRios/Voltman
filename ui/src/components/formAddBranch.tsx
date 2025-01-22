import React, { useState } from "react";
import { getToken } from "../hooks/handleToken";

const FormComponent: React.FC = () => {

  const token = getToken();  
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Recoger datos del formulario
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      // Petición POST al backend
      const response = await fetch("http://localhost:5050/api/branch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`Success: ${result.message}`);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setMessage("Failed to connect to the server.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-xl font-bold text-center text-gray-700">
          Formulario
        </h2>

        {/* Campo: Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo: Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            id="Addr"
            name="Addr"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo: Type */}
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Type
          </label>
          <input
            type="text"
            id="Type"
            name="Type"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo: Limit */}
        <div className="mb-4">
          <label
            htmlFor="limit"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Limit
          </label>
          <input
            type="number"
            id="Limit"
            name="Limit"
            defaultValue={1000}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo: Extra Percent */}
        <div className="mb-4">
          <label
            htmlFor="extraPercent"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Extra Percent
          </label>
          <input
            type="number"
            id="Extra_Percent"
            name="Extra_Percent"
            defaultValue={15}
            step="0.01"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo: Increase */}
        <div className="mb-6">
          <label
            htmlFor="increase"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Increase
          </label>
          <input
            type="number"
            id="Increase"
            name="Increase"
            defaultValue={20}
            step="0.01"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>

        {/* Mensaje de Respuesta */}
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.startsWith("Success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default FormComponent;
