import { useContext } from "react";
import { SelectedChatContext } from "../Contexts/SelectedChatContext";

function UseSelectHook() {
        const { selected, setSelected } = useContext(SelectedChatContext);
        return { selected, setSelected };
}

export default UseSelectHook;