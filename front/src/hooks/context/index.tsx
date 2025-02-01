import { createContext, useState, PropsWithChildren, useContext } from "react";

type AppContextType = {
  selectedLegislator: string;
  updateLegislator: (legislatorId: string) => void;
  clearSelected: VoidFunction;
  selectedBill: string;
  updateBill: (billId: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedLegislator, setSelectedLegislator] = useState("");
  const [selectedBill, setSelectedBill] = useState("");

  const clearSelected = () => {
    setSelectedLegislator("");
    setSelectedBill("");
  };

  const updateLegislator = (id: string) => {
    clearSelected();
    setSelectedLegislator(id);
  };

  const updateBill = (id: string) => {
    clearSelected();
    setSelectedBill(id);
  };

  return (
    <AppContext.Provider
      value={{
        selectedLegislator,
        updateLegislator,
        clearSelected,
        selectedBill,
        updateBill,
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
