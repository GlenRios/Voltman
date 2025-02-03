import React from 'react';

interface SelectorProps {
    options: string[];
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const Selector: React.FC<SelectorProps> = ({ options, label, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="w-auto max-w-64 border border-gray-700 rounded-lg p-2 text-lg dark:bg-gray-800 dark:text-white">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border rounded"
            >
                <option value="">Selecciona una opción</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Selector;
