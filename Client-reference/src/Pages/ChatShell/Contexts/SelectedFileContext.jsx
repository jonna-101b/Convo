import { createContext, useState } from "react";


export const SelectedFileContext = createContext();

export function SelectedFileContextProvider({ children }) {
        const [selectedFile, setSelectedFile] = useState({});

        return (
                <SelectedFileContext.Provider value={{ selectedFile, setSelectedFile }}>
                        {children}
                </SelectedFileContext.Provider>
        );
}