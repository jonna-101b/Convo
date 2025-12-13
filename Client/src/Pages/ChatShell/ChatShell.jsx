import { FriendsContextProvider } from "../../Contexts/FriendsContext";
import { GroupsContextProvider } from "../../Contexts/GroupsContext";
import { SelectedChatContextProvider } from "./Contexts/SelectedChatContext";
import { PopUpContextProvider } from "./Contexts/PopUpContext";
import { InfoDisplayContextProvider } from "./Contexts/InfoDisplayContext";
import { SelectedFileContextProvider } from "./Contexts/SelectedFileContext";
import { SelectedTabStatusContextProvider } from "./Contexts/SelectedTabStatusContext";
import SidePanel from "./Components/SidePanel/SidePanel";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import InfoPanel from "./Components/InfoPanel/InfoPanel";
import PopUp from "./Components/PopUp/PopUp";
import './ChatShell.css';


function ChatShell() {
        return (
                <FriendsContextProvider>
                        <GroupsContextProvider>
                                <SelectedChatContextProvider>
                                        <PopUpContextProvider>
                                                <InfoDisplayContextProvider>
                                                        <SelectedFileContextProvider>
                                                                <SelectedTabStatusContextProvider>
                                                                        <div className="chat-shell">
                                                                                <SidePanel />

                                                                                <ChatWindow />

                                                                                <InfoPanel />

                                                                                <PopUp />
                                                                        </div>
                                                                </SelectedTabStatusContextProvider>
                                                        </SelectedFileContextProvider>
                                                </InfoDisplayContextProvider>
                                        </PopUpContextProvider>
                                </SelectedChatContextProvider>
                        </GroupsContextProvider>
                </FriendsContextProvider>
        );
}

export default ChatShell;