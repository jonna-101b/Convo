import { createContext, useState } from "react";


export const InfoDisplayContext = createContext();

export function InfoDisplayContextProvider({ children }) {
        const [display, setDisplay] = useState(false);

        return (
                <InfoDisplayContext.Provider value={{ display, setDisplay }}>
                        {children}
                </InfoDisplayContext.Provider>
        );
}