import { createContext, useState } from "react";


export const SelectedTabStatusContext = createContext();

export function SelectedTabStatusContextProvider({ children }) {
        const [selectedTab, setSelectedTab] = useState("");

        return (
                <SelectedTabStatusContext.Provider value={{ selectedTab, setSelectedTab }}>
                        {children}
                </SelectedTabStatusContext.Provider>
        );
}