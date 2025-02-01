"use client";

import ButtonBack from '@/src/components/buttons/ButtonBack';
import Logo from "@/src/components/logo";
import { fetchBranchesNames } from "@/src/api/branchService";
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";

import React, { useState, useEffect } from 'react';
import { getToken } from "@/src/hooks/handleToken";

interface ConsumptionForm {
  Company: string;
  Reading: number;
  Date: string;
}

const DailyConsumptionPage: React.FC = () => {

  const token = getToken();
  const { showAlert, alertData } = useAlert();
  const [forms, setForms] = useState<ConsumptionForm[]>([
    { Company: '', Reading: 0, Date: '' },
  ]);
  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  //Obtener nombres de las sucursales al abrir la pagina
  useEffect(() => { fetchBranches(); }, []);
  const fetchBranches = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/branch/", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) {
        showAlert(true, data.error, 5000)
      }
      const names = data.map((item: { Name: any; }) => item.Name)
      // Elimina valores vacíos
      setCompanyNames(names);
      // showAlert(false, data.message || "Operation was successful!", 3000)

    } catch (Error) {
      console.error(Error)
    }
  };

  const handleFormChange = (
    index: number,
    field: keyof ConsumptionForm,
    value: string | number
  ) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = value;
    setForms(updatedForms);
  };

  const addForm = () => {
    setForms([...forms, { Company: '', Reading: 0, Date: '' }]);
  };

  const removeForm = (index: number) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5050/api/bill/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forms),
      });
      const data = await response.json();
      if (response.ok) {
        setForms([{ Company: '', Reading: 0, Date: '' }]);
        showAlert(false, data.message || "successful registration", 3000);
      } else {

        showAlert(true, `Error ${response.status}: ${data.error || 'No se pudo registrar el consumo'}`, 5000);
      }
    } catch (error) {
      showAlert(true, "Error: NetworkError when attempting to fetch resource.", 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 h-screen fondo bg-cover">
      {alertData.isVisible && (
        <Alert
          type={alertData.type}
          message={alertData.message}
          onClose={() => showAlert(false, "", 0)}
        />
      )}
      <div className='flex justify-center items-center'>
        <Logo
          width={200}
          height={200}>
        </Logo>
        <h2 className="text-4xl font-extrabold text-center text-black dark:text-white">
          Consumption records!
        </h2>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <ButtonBack />
        <button
          onClick={addForm}
          className="buttonBlue"
        >
          Add
        </button>
      </div>
      {forms.map((form, index) => (
        <div key={index} className="card w-auto max-w-1/2 ">
          <div className="flex flex-col lg:flex-row gap-4">
            <select
              value={form.Company}
              onChange={(e) => handleFormChange(index, 'Company', e.target.value)}
              className="selector"
            >
              <option value="">Selecciona una empresa</option>
              {companyNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={form.Reading}
              onChange={(e) => handleFormChange(index, 'Reading', Number(e.target.value))}
              placeholder="Reading"
              className="styleInput"
            />

            <input
              type="date"
              value={form.Date}
              onChange={(e) => handleFormChange(index, 'Date', e.target.value)}
              className="styleInput"
            />
          </div>
          <button
            onClick={() => removeForm(index)}
            className="buttonRed m-2"
          >
            Eliminar
          </button>
        </div>
      ))}
      <div className='flex flex-row gap-2'>
        <button
          onClick={addForm}
          className="buttonBlue"
        >
          Add
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`buttonGreen ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </div>

    </div>
  );
};

export default DailyConsumptionPage;
