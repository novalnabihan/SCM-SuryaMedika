// components/alerts/AlertProvider.jsx
'use client';
import { createContext, useContext, useState, useCallback } from "react";
import GlobalAlert from "./GlobalAlert";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null); // { message, severity }

  const showAlert = useCallback((alertProps) => {
    setAlert({ ...alertProps, open: true });

    setTimeout(() => {
      setAlert(null);
    }, alertProps.autoHideDuration || 4000);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <GlobalAlert alert={alert} />
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
