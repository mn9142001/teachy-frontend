import React, { createContext, useContext, useState } from 'react';
import {ErrorHandlerComponent} from "../components/error_handler";


const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const clearError = () => {
    setErrorMessage(null);
  };

  const setError = (message) => {
    setErrorMessage(message);
  };

  if (errorMessage) {
    return <ErrorHandlerComponent message={errorMessage} />;
  }
  
  return (
    <ErrorContext.Provider value={{ errorMessage, clearError, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

