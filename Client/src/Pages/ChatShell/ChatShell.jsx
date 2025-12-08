import { FriendsContextProvider } from "../../Contexts/FriendsContext";
import { SelectedChatContextProvider } from "./Contexts/SelectedChatContext";
import { InfoDisplayContextProvider } from "./Contexts/InfoDisplayContext";
import UseSelectHook from "./Hooks/UseSelectHook";
import SidePanel from "./Components/SidePanel/SidePanel";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import InfoPanel from "./Components/InfoPanel/InfoPanel";
import './ChatShell.css';


function ChatShell() {
        return (
                <FriendsContextProvider>
                        <SelectedChatContextProvider>
                                <InfoDisplayContextProvider>
                                        <div className="chat-shell">
                                                <SidePanel />

                                                <ChatWindow />

                                                <InfoPanel />
                                        </div>
                                </InfoDisplayContextProvider>
                        </SelectedChatContextProvider>
                </FriendsContextProvider>
        );
}

export default ChatShell;