import { FunctionsError, httpsCallable, HttpsCallable, HttpsCallableResult } from 'firebase/functions';
import React, { createContext } from 'react';
import { useFirebase } from '../hooks/useFirebase';

interface FunctionsContextType {
  callFunction: <RequestData = unknown, ResponseData = unknown>(
    functionName: string,
    data?: RequestData
  ) => Promise<ResponseData>;
}

export const FunctionsContext = createContext<FunctionsContextType | null>(null);

export const FunctionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {functions} = useFirebase();

  const callFunction = async <RequestData = unknown, ResponseData = unknown>(
    functionName: string,
    data?: RequestData
  ): Promise<ResponseData> => {
    const callable: HttpsCallable<RequestData, ResponseData> = httpsCallable(functions, functionName);
    try {
      const result: HttpsCallableResult<ResponseData> = await callable(data);
      return result.data;
    } catch (error) {
      const functionsError = error as FunctionsError;
      console.error(`Failed to call function '${functionName}': ${functionsError.message}`);
      throw new Error(`Failed to call function: ${functionsError.message}`);
    }
  };

  return (
    <FunctionsContext.Provider
      value={{callFunction}}
    >
      {children}
    </FunctionsContext.Provider>
  );
};

