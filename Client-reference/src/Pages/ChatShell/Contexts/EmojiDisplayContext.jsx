import { createContext, useState } from "react";


export const EmojiDisplayContext = createContext();

export function EmojiDisplayContextProvider({ children }) {
        const [display, setDisplay] = useState(false);

        return (
                <EmojiDisplayContext.Provider value={{ display, setDisplay }}>
                        {children}
                </EmojiDisplayContext.Provider>
        );
}