import React, { useState } from "react";
import { getToken } from "../../hooks/handleToken";

const FormComponent: React.FC<{ show: any }> = ({ show }) => {

  const token = getToken();
  const [message, setMessage] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Recoger datos del formulario
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      // Petición POST al backend
      const response = await fetch("http://localhost:5050/api/branch/", {
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
  const handleCancel = () => {
    show(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
    >
      <h2 className="tittle">
        Formulario
      </h2>

      {/* Campo: Name */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="subtittle"
        >
          Name
        </label>
        <input
          type="text"
          id="Name"
          name="Name"
          className="styleInput"
          required
        />
      </div>

      {/* Campo: Address */}
      <div className="mb-4">
        <label
          htmlFor="address"
          className="subtittle"
        >
          Address
        </label>
        <input
          type="text"
          id="Addr"
          name="Addr"
          className="styleInput"
          required
        />
      </div>

      {/* Campo: Type */}
      <div className="mb-4">
        <label
          htmlFor="type"
          className="subtittle"
        >
          Type
        </label>
        <input
          type="text"
          id="Type"
          name="Type"
          className="styleInput"
          required
        />
      </div>

      {/* Campo: Limit */}
      <div className="mb-4">
        <label
          htmlFor="limit"
          className="subtittle"
        >
          Limit
        </label>
        <input
          type="number"
          id="Limit"
          name="Limit"
          defaultValue={1000}
          className="styleInput"
          required
        />
      </div>

      {/* Campo: Extra Percent */}
      <div className="mb-4">
        <label
          htmlFor="extraPercent"
          className="subtittle"
        >
          Extra Percent
        </label>
        <input
          type="number"
          id="Extra_Percent"
          name="Extra_Percent"
          defaultValue={15}
          step="0.01"
          className="styleInput"
          required
        />
      </div>

      {/* Campo: Increase */}
      <div className="mb-6">
        <label
          htmlFor="increase"
          className="subtittle"
        >
          Increase
        </label>
        <input
          type="number"
          id="Increase"
          name="Increase"
          defaultValue={20}
          step="0.01"
          className="styleInput"
          required
        />
      </div>

      {/* Botones */}
      <button
        type="submit"
        className="buttonBlue"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="buttonGray"
      >
        Cancel
      </button>

      {/* Mensaje de Respuesta */}
      {message && (
        <p
          className={`mt-4 text-center text-sm ${message.startsWith("Success") ? "text-green-600" : "text-red-600"
            }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default FormComponent;
