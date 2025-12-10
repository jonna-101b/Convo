import { useContext } from "react";
import { PopUpContext } from "../Contexts/PopUpContext";

function usePopUpHook() {
        const { label, setLabel } = useContext(PopUpContext);
        return { label, setLabel };
}

export default usePopUpHook;