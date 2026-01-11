import { useContext } from "react";
import { EmojiDisplayContext } from "../Contexts/EmojiDisplayContext";

function useEmojiDisplayHook() {
        const { display, setDisplay } = useContext(EmojiDisplayContext);
        return { display, setDisplay };
}

export default useEmojiDisplayHook;