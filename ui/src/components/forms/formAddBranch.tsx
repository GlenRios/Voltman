import React, { useState } from "react";
import { getToken } from "../../hooks/handleToken";
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";

const FormComponent: React.FC<{ show: any, fetchNames: () => void }> = ({ show, fetchNames }) => {

  const { showAlert, alertData } = useAlert();
  const token = getToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Recoger datos del formulario
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:5050/api/branch/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showAlert(false, "Operation was successful!", 1500);
        fetchNames();
        handleCancel();
        return;
      } else {
        const data = await response.json();
        showAlert(true, data.error, 2000);
      }
    } catch (error: any) {
      showAlert(true, error.message, 2000);
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
      {alertData.isVisible && (
        <Alert
          type={alertData.type}
          message={alertData.message}
          onClose={() => showAlert(false, "", 0)}
        />
      )}
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
      <div className="text-center ">
        <button
          type="submit"
          className="buttonBlue m-1"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="buttonGray m-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
