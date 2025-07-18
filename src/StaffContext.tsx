// src/StaffContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type StaffContextType = {
  staffName: string;
  setStaffName: (name: string) => void;
};

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider = ({ children }: { children: ReactNode }) => {
  const [staffName, setStaffName] = useState("");

  return (
    <StaffContext.Provider value={{ staffName, setStaffName }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) throw new Error("useStaff must be used within StaffProvider");
  return context;
};
