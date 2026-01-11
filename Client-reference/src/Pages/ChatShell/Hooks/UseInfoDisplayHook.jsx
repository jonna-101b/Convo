import { useContext } from "react";
import { InfoDisplayContext } from "../Contexts/InfoDisplayContext";

function useInfoDisplayHook() {
        const { display, setDisplay } = useContext(InfoDisplayContext);
        return { display, setDisplay };
}

export default useInfoDisplayHook;