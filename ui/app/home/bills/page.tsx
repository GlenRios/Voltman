"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { buttonBack } from "@/src/components/buttons";
import { goHome } from "@/src/hooks/handleRouts";
import logo from "@/src/components/logo";

export default function FormularioDinamico() {

  const router = useRouter();
  const [nextIdForm, setNextIdForm] = useState<number>(2);
  const [formularios, setFormularios] = useState([
    { id: 1, fecha: "", consumo: "", sucursal: "" },
  ]);

  
  const sucursales = ["Sucursal A", "Sucursal B", "Sucursal C", "Sucursal D"];
  const [notification, setNotification] = useState<string | null>(null);

  // Manejar cambios en los campos de un formulario específico
  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { name, value } = e.target;
    setFormularios((prev) =>
      prev.map((form) => (form.id === id ? { ...form, [name]: value } : form))
    );
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/api/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formularios),
      });

      if (response.ok) {
        alert("Datos enviados correctamente");
        setFormularios([{ id: 1, fecha: "", consumo: "", sucursal: "" }]); // Reiniciar formularios
      } else {
        alert("Hubo un problema al enviar los datos");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al conectar con el servidor");
    }
  };
  const addForm = () => {
    setFormularios((prev) => [
      ...prev,
      { id: prev.length + 1, fecha: "", consumo: "", sucursal: "" },
    ]);
  };
  const deleteForm = (id: number) => {
    setFormularios((prev) => prev.filter((form) => form.id !== id));
  };
  return (
    <div className="flex flex-col gap-4 items-center min-h-screen bg-gray-100 p-4 bg-[url('http://localhost:3000/images/claro3.jpg')] dark:bg-[url('http://localhost:3000/images/oscuro2.jpg')] bg-cover bg-no-repeat bg-center overflow-auto bg-fixed">

      <div className='flex justify-center items-center'>
        {logo(50,50)}
        <h2 className="text-4xl font-extrabold text-center text-black dark:text-white">
          Consumption records!
        </h2>
      </div>

      {notification && (
        <div className="mb-4 p-4 h-10 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}

      <div className="flex flex-row justify-center items-center">

        {buttonBack(() => goHome(router))}

        <button
          type="button"
          onClick={addForm}
          className="bg-green-500 hover:bg-green-700 text-white w-14 h-10 rounded focus:outline-none focus:shadow-outline dark:shadow-slate-900 dark:shadow-lg shadow-zinc-700 shadow-md"
        >
          New
        </button>

      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md">

        {formularios.map((formulario) => (
          <div
            key={formulario.id}
            className="relative bg-white shadow-md px-8 pt-6 pb-8 mb-4 dark:border-4 dark:border-zinc-700 rounded-2xl  dark:bg-black "
          >
            <button
              type="button"
              onClick={() => deleteForm(formulario.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600 p-1 scale-125 dark:text-white"
              aria-label="Eliminar formulario"
            >
              X
            </button>

            {/* Sucursal */}
            <div className="mb-4">
              <label
                htmlFor={`sucursal-${formulario.id}`}
                className="block text-gray-700 text-sm dark:text-white font-bold mb-2"
              >
                Sucursal:
              </label>
              <select
                id={`sucursal-${formulario.id}`}
                name="sucursal"
                value={formulario.sucursal}
                onChange={(e) => handleInputChange(e, formulario.id)}
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:border-zinc-700 dark:border-2 rounded-lg"
                required
              >
                <option value="">Seleccione una sucursal</option>
                {sucursales.map((sucursal, index) => (
                  <option key={index} value={sucursal}>
                    {sucursal}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha */}
            <div className="mb-4">
              <label
                htmlFor={`fecha-${formulario.id}`}
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              >
                Fecha:
              </label>
              <input
                type="date"
                id={`fecha-${formulario.id}`}
                name="fecha"
                value={formulario.fecha}
                onChange={(e) => handleInputChange(e, formulario.id)}
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  dark:border-zinc-700 dark:border-2 rounded-lg"
                required
              />
            </div>

            {/* Consumo */}
            <div className="mb-4">
              <label
                htmlFor={`consumo-${formulario.id}`}
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              >
                Lectura:
              </label>
              <input
                type="number"
                id={`consumo-${formulario.id}`}
                name="consumo"
                value={formulario.consumo}
                onChange={(e) => handleInputChange(e, formulario.id)}
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:border-zinc-700 dark:border-2 rounded-lg"
                required
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={addForm}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:shadow-slate-900 dark:shadow-lg shadow-zinc-700 shadow-md"
          >
            New
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  shadow-zinc-700 shadow-md "
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}