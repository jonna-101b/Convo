import { createContext, useState } from "react";

export const PopUpContext = createContext();

export function PopUpContextProvider({ children }) {
  const [popUp, setPopUp] = useState({
    isOpen: false,
    type: null, // 'settings', 'search', 'socialRadar', 'filesShared', 'logout'
  });

  return (
    <PopUpContext.Provider value={{ popUp, setPopUp }}>
      {children}
    </PopUpContext.Provider>
  );
}
