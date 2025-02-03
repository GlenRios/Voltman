import React from "react";

interface OptionProps {
    message: string;
    onAcept: () => void;
    onCancel: () => void;
}

const Option: React.FC<OptionProps> = ({ message, onAcept, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div
                className={`w-80 p-4 rounded-lg shadow-lg bg-gray-600 text-white text-center`}
            >
                <p>{message}</p>
                <div className="flex flex-row gap-4 item-center justify-center mt-4">
                    <button
                        onClick={onAcept}
                        className="buttonGreen"
                    >
                        Acept
                    </button>
                    <button
                        onClick={onCancel}
                        className="buttonBlack"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Option;