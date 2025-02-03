import React from "react";

interface AlertProps {
    type: "success" | "error";
    message: string;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div
                className={`w-80 p-4 h-auto rounded-lg shadow-lg ${type === "success" ? "bg-green-500" : "bg-red-500"
                    } text-white text-center`}
            >
                <p>{message}</p>
                {/* <button
                    onClick={onClose}
                    className="mt-4 bg-white text-black px-4 py-2 rounded-lg"
                >
                    Close
                </button> */}
            </div>
        </div>
    );
};

export default Alert;
