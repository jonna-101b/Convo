import { useContext } from "react";
import { SelectedChatContext } from "../contexts/SelectedChatContext";

function useSelectedChatHook() {
  const { selected, setSelected } = useContext(SelectedChatContext);

  return {
    selectedChat: selected,
    setSelectedChat: setSelected,
  };
}

export default useSelectedChatHook;
