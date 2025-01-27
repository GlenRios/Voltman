"use client";

import { ChangeEvent, useEffect, useState } from "react";
import ButtonBack from '@/src/components/buttons/ButtonBack';
import Logo from "@/src/components/logo";
import { fetchBranches } from "@/src/api/branchService";
import submitBills from "@/src/api/billService";
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/Alert";

export default function billsPage() {

  const { showAlert, alertData } = useAlert();
  const [nextIdForm, setNextIdForm] = useState<number>(2);
  const [formularios, setFormularios] = useState<{ id: number, Date: string, Bill: number, Brach: string }[]>([
    { id: 1, Date: "", Bill: 0, Brach: "" },
  ]);

  const [branchesName, setBranchesName] = useState<{ name: string; id: number }[]>([]);

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
  // Cargar los nombres de las Braches a las que el usuario tiene acceso
  useEffect(() => { getNames(); }, []);
  const getNames = async () => {
    try {
      const response = await fetchBranches();
      const data = await response.json();
      if (!response.ok) {
        showAlert(true, data.error, 5000);
        return;
      }
      const names = data.map((item: { id: number; Name: string; }) => ({
        id: item.id ?? null,
        name: item.Name ?? "N/A"
      }))
      setBranchesName(names);
    } catch (Error) {
      console.error(Error)
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await submitBills(formularios);
      if (response.ok) {
        showAlert(false, "", 3000);
        setFormularios([{ id: 1, Date: "", Bill: 0, Brach: "" }]); // Reiniciar formularios
      } else {
        const data = await response.json();
        showAlert(true, data.error, 5000);
        return;
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const addForm = () => {
    setFormularios((prev) => [
      ...prev,
      { id: nextIdForm, Date: "", Bill: 0, Brach: "" },
    ]);
    setNextIdForm(nextIdForm + 1);
  };

  const deleteForm = (id: number) => {
    setFormularios((prev) => prev.filter((form) => form.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 items-center min-h-screen bg-gray-100 p-4 bg-[url('http://localhost:3000/images/claro3.jpg')] dark:bg-[url('http://localhost:3000/images/oscuro2.jpg')] bg-cover bg-no-repeat bg-center overflow-auto bg-fixed">
      {alertData.isVisible && (
        <Alert
          type={alertData.type}
          message={alertData.message}
          onClose={() => showAlert(false, "", 0)}
        />
      )}
      <div className='flex justify-center items-center'>
        <Logo
          width={50}
          height={50}>
        </Logo>
        <h2 className="text-4xl font-extrabold text-center text-black dark:text-white">
          Consumption records!
        </h2>
      </div>
      <div className="flex flex-row justify-center items-center">
        <ButtonBack />
        <button
          type="button"
          onClick={addForm}
          className="bg-green-500 hover:bg-green-700 text-white w-14 h-10 rounded focus:outline-none focus:shadow-outline dark:shadow-slate-900 dark:shadow-lg shadow-zinc-700 shadow-md">
          New
        </button>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {formularios.map((formulario) => (
          <div
            key={formulario.id}
            className="relative bg-white shadow-md px-8 pt-6 pb-8 mb-4 dark:border-4 dark:border-zinc-700 rounded-2xl  dark:bg-black ">
            <button
              type="button"
              onClick={() => deleteForm(formulario.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600 p-1 scale-125 dark:text-white"
              aria-label="Eliminar formulario">
              X
            </button>

            {/* Brach */}
            <div className="mb-4">
              <label
                htmlFor={`Brach-${formulario.id}`}
                className="block text-gray-700 text-sm dark:text-white font-bold mb-2"
              >
                Branch:
              </label>
              <select
                id={`branch-selector-${formulario.id}`} // ID único para cada selector
                name="Brach"
                value={formulario.Brach}
                onChange={(e) => handleInputChange(e, formulario.id)} // Actualiza el campo del formulario específico
                className="w-auto max-w-64 border border-gray-700 rounded-lg p-2 text-lg dark:bg-gray-800 dark:text-white"
              >
                <option value="">Selecciona una Brach</option>
                {branchesName.map((branch, index) => (
                  <option key={index} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>

            </div>

            {/* Date */}
            <div className="mb-4">
              <label
                htmlFor={`Date-${formulario.id}`}
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              >
                Date:
              </label>
              <input
                type="date"
                id={`Date-${formulario.id}`}
                name="Date"
                value={formulario.Date}
                onChange={(e) => handleInputChange(e, formulario.id)}
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  dark:border-zinc-700 dark:border-2 rounded-lg"
                required
              />
            </div>

            {/* Bill */}
            <div className="mb-4">
              <label
                htmlFor={`Bill-${formulario.id}`}
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              >
                Lectura:
              </label>
              <input
                type="number"
                id={`Bill-${formulario.id}`}
                name="Bill"
                value={formulario.Bill}
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