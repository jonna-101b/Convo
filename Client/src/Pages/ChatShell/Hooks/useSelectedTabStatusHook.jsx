import { useContext } from "react";
import { SelectedTabStatusContext } from "../Contexts/SelectedTabStatusContext";

function useSelectedTabStatusHook() {
        const { selectedTab, setSelectedTab } = useContext(SelectedTabStatusContext);
        return { selectedTab, setSelectedTab };
}

export default useSelectedTabStatusHook;