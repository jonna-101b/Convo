import { createContext, useState } from "react";

export const SelectedChatContext = createContext();

export function SelectedChatContextProvider({ children }) {
  const [selected, setSelected] = useState(null);

  return (
    <SelectedChatContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedChatContext.Provider>
  );
}
