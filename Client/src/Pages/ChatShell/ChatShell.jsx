import { FriendsContextProvider } from "../../Contexts/FriendsContext";
import { SelectedChatContextProvider } from "./Contexts/SelectedChatContext";
import { PopUpContextProvider } from "./Contexts/PopUpContext";
import { InfoDisplayContextProvider } from "./Contexts/InfoDisplayContext";
import SidePanel from "./Components/SidePanel/SidePanel";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import InfoPanel from "./Components/InfoPanel/InfoPanel";
import PopUp from "./Components/PopUp/PopUp";
import './ChatShell.css';


function ChatShell() {
        return (
                <FriendsContextProvider>
                        <SelectedChatContextProvider>
                                <PopUpContextProvider>
                                        <InfoDisplayContextProvider>
                                                <div className="chat-shell">
                                                        <SidePanel />

                                                        <ChatWindow />

                                                        <InfoPanel />

                                                        <PopUp />
                                                </div>
                                        </InfoDisplayContextProvider>
                                </PopUpContextProvider>
                        </SelectedChatContextProvider>
                </FriendsContextProvider>
        );
}

export default ChatShell;