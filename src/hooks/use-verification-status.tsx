
import { createContext, useContext, useState, ReactNode } from "react";

type VerificationStatus = "waiting_for_doc" | "pending" | "validated" | "rejected";

interface VerificationContextType {
  status: VerificationStatus;
  updateStatus: (newStatus: VerificationStatus) => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<VerificationStatus>("waiting_for_doc");

  const updateStatus = (newStatus: VerificationStatus) => {
    setStatus(newStatus);
    
    // Dans une application réelle, nous mettrions également à jour Supabase ici
    console.log(`Status updated to: ${newStatus}`);
  };

  return (
    <VerificationContext.Provider value={{ status, updateStatus }}>
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerificationStatus() {
  const context = useContext(VerificationContext);
  
  if (context === undefined) {
    throw new Error("useVerificationStatus must be used within a VerificationProvider");
  }
  
  return context;
}
