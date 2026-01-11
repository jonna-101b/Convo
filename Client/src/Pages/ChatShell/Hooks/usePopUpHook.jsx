import { useContext } from "react";
import { PopUpContext } from "../contexts/PopUpContext";

function usePopUpHook() {
  const { popUp, setPopUp } = useContext(PopUpContext);

  const openPopUp = (type) => {
    setPopUp({ isOpen: true, type });
  };

  const closePopUp = () => {
    setPopUp({ isOpen: false, type: null });
  };

  return {
    popUp,
    openPopUp,
    closePopUp,
  };
}

export default usePopUpHook;
