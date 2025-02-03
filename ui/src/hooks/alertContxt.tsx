"use client";
import React, { createContext, useContext, useState } from "react";

type AlertContextType = {
  showAlert: (isError: boolean, messageError: string, time: number) => void;
  alertData: { isVisible: boolean; type: "success" | "error"; message: string };
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [alertData, setAlertData] = useState({
    isVisible: false,
    type: "success" as "success" | "error",
    message: "",
  });

  const showAlert = (isError: boolean, messageError: string, time: number) => {
    setAlertData({
      isVisible: true,
      type: isError ? "error" : "success",
      message: messageError,
    });

    setTimeout(() => {
      setAlertData({
        isVisible: false,
        type: "success",
        message: "",
      });
    }, time);
  };

  return (
    <AlertContext.Provider value={{ showAlert, alertData }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
