import { useContext } from "react";
import { EmojiDisplayContext } from "../contexts/EmojiDisplayContext";

function useEmojiDisplayHook() {
  const { display, setDisplay } = useContext(EmojiDisplayContext);

  return {
    emojiDisplay: display,
    setEmojiDisplay: setDisplay,
  };
}

export default useEmojiDisplayHook;
