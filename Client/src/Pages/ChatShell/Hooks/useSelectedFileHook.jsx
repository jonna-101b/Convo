import { useContext } from "react";
import { SelectedFileContext } from "../Contexts/SelectedFileContext";

function useSelectedFileHook() {
        const { selectedFile, setSelectedFile } = useContext(SelectedFileContext);
        return { selectedFile, setSelectedFile };
}

export default useSelectedFileHook;