import { useContext } from "react";
import { InfoDisplayContext } from "../contexts/InfoDisplayContext";

function useInfoDisplayHook() {
  const { display, setDisplay } = useContext(InfoDisplayContext);

  return {
    infoDisplay: display,
    setInfoDisplay: setDisplay,
  };
}

export default useInfoDisplayHook;
