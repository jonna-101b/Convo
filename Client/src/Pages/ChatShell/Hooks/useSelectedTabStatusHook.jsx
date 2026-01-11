import { useContext } from "react";
import { SelectedTabStatusContext } from "../contexts/SelectedTabStatusContext";

function useSelectedTabStatusHook() {
  const { tabStatus, setTabStatus } = useContext(SelectedTabStatusContext);

  return {
    tabStatus,
    setTabStatus,
  };
}

export default useSelectedTabStatusHook;
