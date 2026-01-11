import { createContext, useState } from "react";


export const PopUpContext = createContext();

export function PopUpContextProvider({ children }) {
        const [label, setLabel] = useState("");

        return (
                <PopUpContext.Provider value={{ label, setLabel }}>
                        {children}
                </PopUpContext.Provider>
        );
}