import { createContext, useState, PropsWithChildren, useContext } from "react";

type AppContextType = {
  selectedLegislator: string;
  setSelectedLegislator: (legislatorId: string) => void;
  clearSelectedLegislator: VoidFunction;
  selectedBill: string;
  setSelectedBill: (billId: string) => void;
  clearSelectedBill: VoidFunction;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedLegislator, setSelectedLegislator] = useState("");
  const [selectedBill, setSelectedBill] = useState("");

  const clearSelectedLegislator = () => {
    setSelectedLegislator("");
  };

  const clearSelectedBill = () => {
    setSelectedBill("");
  };

  return (
    <AppContext.Provider
      value={{
        selectedLegislator,
        setSelectedLegislator,
        clearSelectedLegislator,
        selectedBill,
        setSelectedBill,
        clearSelectedBill,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext should be used inside AppProvider");
  }
  return context;
};
