import { createContext, useState } from "react";

export const SelectedTabStatusContext = createContext();

export function SelectedTabStatusContextProvider({ children }) {
  const [tabStatus, setTabStatus] = useState("chats"); // 'chats', 'friends', 'groups'

  return (
    <SelectedTabStatusContext.Provider value={{ tabStatus, setTabStatus }}>
      {children}
    </SelectedTabStatusContext.Provider>
  );
}
